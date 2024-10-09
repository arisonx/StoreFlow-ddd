import { SignaturePlanEnum } from '@domain/entities/user/signature'
import { AuthShopKeeperInitialUseCase } from './auth-shopkeeper.use-case'

const ShopKeeperInitialVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
  emailAlreadyExists: vi.fn(),
  findByEmail: vi.fn(),
  cpfAlreadyExists: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
}

const mockBcryptAdapter = {
  hash: vi.fn(),
  compare: vi.fn(),
}

describe('AuthShopKeeperInitialUseCase Unit Tests', () => {
  let authShopKeeperInitialUseCase: AuthShopKeeperInitialUseCase

  beforeAll(() => {
    authShopKeeperInitialUseCase = new AuthShopKeeperInitialUseCase(
      ShopKeeperInitialVitestRepo,
      mockBcryptAdapter,
    )
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should throw an error if ShopKeeperInitial not exists', async () => {
    ShopKeeperInitialVitestRepo.findByEmail.mockResolvedValue(false)
    expect(async () => {
      await authShopKeeperInitialUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Invalid Email or Password')
  })

  it('Should throw an error if CPF is not valid', async () => {
    ShopKeeperInitialVitestRepo.findByEmail.mockResolvedValue({
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      signature: {
        startDate: new Date('2024-09-15'),
        endDate: new Date('2025-09-15'),
        plan: SignaturePlanEnum.PREMIUM,
      },
    })
    mockBcryptAdapter.compare.mockReturnValue(false)
    expect(async () => {
      await authShopKeeperInitialUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Invalid Email or Password')
  })

  it('Should throw an error if ShopKeeperInitial Contract is expired', async () => {
    ShopKeeperInitialVitestRepo.findByEmail.mockResolvedValue({
      id: '35c7c1b6-ada3-424d-b1b9-8c646b83ec23',
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      contract: {
        startDate: new Date('2024-08-30'),
        expired: true,
        endDate: new Date(),
        plan: SignaturePlanEnum.BASIC,
      },
    })
    mockBcryptAdapter.compare.mockResolvedValue(true)
    expect(async () => {
      await authShopKeeperInitialUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Contract Expired')
  })

  it('Should throw an error if ShopKeeperInitial Signature is expired', async () => {
    ShopKeeperInitialVitestRepo.findByEmail.mockResolvedValue({
      id: '35c7c1b6-ada3-424d-b1b9-8c646b83ec23',
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      signature: {
        startDate: new Date('2024-09-15'),
        expired: true,
        endDate: new Date('2025-09-15'),
        plan: SignaturePlanEnum.PREMIUM,
      },
    })
    mockBcryptAdapter.compare.mockResolvedValue(true)
    expect(async () => {
      await authShopKeeperInitialUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Signature Expired')
  })

  it('Should authenticate a ShopKeeperInitial', async () => {
    ShopKeeperInitialVitestRepo.findByEmail.mockResolvedValue({
      id: '35c7c1b6-ada3-424d-b1b9-8c646b83ec23',
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      contract: {
        startDate: new Date('2024-09-15'),
        expired: false,
        endDate: new Date('2025-09-15'),
        plan: SignaturePlanEnum.PREMIUM,
      },
    })
    mockBcryptAdapter.compare.mockResolvedValue(true)
    const output = await authShopKeeperInitialUseCase.execute({
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
    })
    expect(ShopKeeperInitialVitestRepo.findByEmail).toBeCalledWith(
      'merian.cardoso@example.com',
    )
    expect(output).toBeTruthy()
    expect(output.email).toBe('merian.cardoso@example.com')
  })
})
