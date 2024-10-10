import ShopKeeperFactory from '@domain/user/@shared/factories/shop-keeper.factory'
import { SignaturePlanEnum } from '@domain/user/shopkeeper/signature/signature'
import { ListShopKeeperUseCase } from './list-shopkeeper.use-case'

const ShopKeeper1 = {
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

const ShopKeeper2 = {
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

const ShopKeeper3 = {
  name: 'Merian Cardoso',
  cpf: '63067078080',
  email: 'merian.cardoso@example.com',
  password: 'AnotherP@ssw0rd',
  rg: '123456789',
  signature: {
    startDate: new Date('2024-09-15'),
    plan: SignaturePlanEnum.PREMIUM,
  },
}

const user1 = ShopKeeperFactory.withContract(ShopKeeper1)

const user2 = ShopKeeperFactory.withContract(ShopKeeper2)

const user3 = ShopKeeperFactory.withSignature(ShopKeeper3)

const ShopKeeperVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn().mockResolvedValue({
    items: [user1, user2, user3],
    meta: {
      totalPages: 1,
      registersInPage: 3,
      currentPage: 1,
    },
  }),
  create: vi.fn(),
  findByEmail: vi.fn(),
  count: vi.fn(),
  emailAlreadyExists: vi.fn(),
  cpfAlreadyExists: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
}

describe('ListShopKeeperUseCase Unit Tests', () => {
  let listShopKeeperUseCase: ListShopKeeperUseCase

  beforeEach(() => {
    listShopKeeperUseCase = new ListShopKeeperUseCase(ShopKeeperVitestRepo)
    vi.clearAllMocks()
  })

  it('Should list all ShopKeepers', async () => {
    const results = await listShopKeeperUseCase.execute()

    expect(results.items).toHaveLength(3)
    expect(results.meta.totalPages).toBe(1)
    expect(results.meta.registersInPage).toBe(3)
    expect(results.meta.totalPages).toBe(1)

    const ShopKeepers = [ShopKeeper1, ShopKeeper2, ShopKeeper3]

    results.items.forEach((item, index) => {
      const currentShopKeeper = ShopKeepers[index]
      if (item) {
        expect(currentShopKeeper.name).toBe(item.name)
        expect(currentShopKeeper.email).toBe(item.email)
        expect(currentShopKeeper.cpf).toBe(item.cpf)
        expect(currentShopKeeper.rg).toBe(item.rg)
      }
    })
    expect(ShopKeeperVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('Should return empty list when no ShopKeepers are found', async () => {
    ShopKeeperVitestRepo.findAll.mockResolvedValueOnce({
      items: [],
      meta: {
        totalPages: 0,
        registersInPage: 0,
        currentPage: 1,
      },
    })

    const results = await listShopKeeperUseCase.execute()

    expect(results.items).toHaveLength(0)
    expect(ShopKeeperVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('Should handle errors gracefully', async () => {
    ShopKeeperVitestRepo.findAll.mockRejectedValueOnce(
      new Error('Database error'),
    )

    await expect(listShopKeeperUseCase.execute()).rejects.toThrow(
      'Database error',
    )
    expect(ShopKeeperVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })
})
