import ShopKeeperInitialFactory from '@domain/entities/user/factories/shoop-keeper.factory'
import { SignaturePlanEnum } from '@domain/entities/user/signature'
import { ListShopKeeperInitialUseCase } from './list-shopkeeper.use-case'

const ShopKeeperInitial1 = {
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

const ShopKeeperInitial2 = {
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

const ShopKeeperInitial3 = {
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

const user1 = ShopKeeperInitialFactory.withContract(ShopKeeperInitial1)

const user2 = ShopKeeperInitialFactory.withContract(ShopKeeperInitial2)

const user3 = ShopKeeperInitialFactory.withSignature(ShopKeeperInitial3)

const ShopKeeperInitialVitestRepo = {
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

describe('ListShopKeeperInitialUseCase Unit Tests', () => {
  let listShopKeeperInitialUseCase: ListShopKeeperInitialUseCase

  beforeEach(() => {
    listShopKeeperInitialUseCase = new ListShopKeeperInitialUseCase(
      ShopKeeperInitialVitestRepo,
    )
    vi.clearAllMocks()
  })

  it('Should list all ShopKeeperInitials', async () => {
    const results = await listShopKeeperInitialUseCase.execute()

    expect(results.items).toHaveLength(3)
    expect(results.meta.totalPages).toBe(1)
    expect(results.meta.registersInPage).toBe(3)
    expect(results.meta.totalPages).toBe(1)

    const ShopKeeperInitials = [
      ShopKeeperInitial1,
      ShopKeeperInitial2,
      ShopKeeperInitial3,
    ]

    results.items.forEach((item, index) => {
      const currentShopKeeperInitial = ShopKeeperInitials[index]
      const signatureOrContract = item.signature || item.contract
      expect(currentShopKeeperInitial.name).toBe(item.name)
      expect(currentShopKeeperInitial.email).toBe(item.email)
      expect(currentShopKeeperInitial.cpf).toBe(item.cpf)
      expect(currentShopKeeperInitial.rg).toBe(item.rg)
      expect(signatureOrContract).toBeTruthy()
    })
    expect(ShopKeeperInitialVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('Should return empty list when no ShopKeeperInitials are found', async () => {
    ShopKeeperInitialVitestRepo.findAll.mockResolvedValueOnce({
      items: [],
      meta: {
        totalPages: 0,
        registersInPage: 0,
        currentPage: 1,
      },
    })

    const results = await listShopKeeperInitialUseCase.execute()

    expect(results.items).toHaveLength(0)
    expect(ShopKeeperInitialVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('Should handle errors gracefully', async () => {
    ShopKeeperInitialVitestRepo.findAll.mockRejectedValueOnce(
      new Error('Database error'),
    )

    await expect(listShopKeeperInitialUseCase.execute()).rejects.toThrow(
      'Database error',
    )
    expect(ShopKeeperInitialVitestRepo.findAll).toHaveBeenCalledTimes(1)
  })
})
