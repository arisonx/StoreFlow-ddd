import ShopKeeperFactory from 'domain/entities/user/factories/shoop-keeper.facotry'
import { ListShopKeeperUseCase } from './list-shopkeeper.use-case'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const shopKeeper1 = {
  name: 'Luis Fernando',
  cpf: '63067078080',
  email: 'luisfernandogvv@gmail.com',
  password: 'S3curityP@ssw0rd',
  rg: '435144820',
  contract: {
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-12-01'),
    value: 2000,
  },
}

const shopKeeper2 = {
  name: 'Maria Silva',
  cpf: '63067078080',
  email: 'maria.silva@example.com',
  password: 'AnotherP@ssw0rd',
  rg: '123456789',
  contract: {
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-12-15'),
    value: 1500,
  },
}

const user1 = ShopKeeperFactory.withContract(shopKeeper1)
const user2 = ShopKeeperFactory.withContract(shopKeeper2)

const shopKeeperVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn().mockResolvedValue({
    items: [user1, user2],
    meta: {
      totalPages: 1,
      registersInPage: 2,
      currentPage: 1,
    },
  }),
  create: vi.fn(),
  count: vi.fn(),
  emailAlreadyExists: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
}

describe('ListShopKeeperUseCase Unit Tests', () => {
  let listShopKeeperUseCase: ListShopKeeperUseCase

  beforeEach(() => {
    listShopKeeperUseCase = new ListShopKeeperUseCase(shopKeeperVitestRepo)
    vi.clearAllMocks()
  })

  it('Should list all ShopKeepers', async () => {
    const results = await listShopKeeperUseCase.execute()

    expect(results.items).toHaveLength(2)
    results.items.forEach((item) => {
      expect(item).toEqual({
        id: expect.any(String),
        name: item.name,
        cpf: item.cpf,
        password: item.password,
        email: item.email,
        rg: item.rg,
        contract: {
          startDate: item.contract.startDate,
          endDate: item.contract.endDate,
          value: item.contract.value,
        },
      })
    })
    expect(shopKeeperVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('Should return empty list when no ShopKeepers are found', async () => {
    shopKeeperVitestRepo.findAll.mockResolvedValueOnce({
      items: [],
      meta: {
        totalPages: 0,
        registersInPage: 0,
        currentPage: 1,
      },
    })

    const results = await listShopKeeperUseCase.execute()

    expect(results.items).toHaveLength(0)
    expect(shopKeeperVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('Should handle errors gracefully', async () => {
    shopKeeperVitestRepo.findAll.mockRejectedValueOnce(
      new Error('Database error'),
    )

    await expect(listShopKeeperUseCase.execute()).rejects.toThrow(
      'Database error',
    )
    expect(shopKeeperVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })
})
