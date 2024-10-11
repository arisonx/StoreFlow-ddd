import { SignaturePlanEnum } from '@domain/user/shopkeeper/signature/signature'
import { AuthShopKeeperUseCase } from './auth-shopkeeper.use-case'
import ShopKeeperFactory from '@domain/user/@shared/factories/shop-keeper.factory'

const ShopKeeperVitestRepo = {
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

const mockJwtAdapter = {
  sign: vi.fn(),
  verify: vi.fn(),
}

describe('AuthShopKeeperUseCase Unit Tests', () => {
  let authShopKeeperUseCase: AuthShopKeeperUseCase

  beforeAll(() => {
    authShopKeeperUseCase = new AuthShopKeeperUseCase(
      ShopKeeperVitestRepo,
      mockBcryptAdapter,
      mockJwtAdapter,
    )
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should throw an error if ShopKeeper not exists', async () => {
    ShopKeeperVitestRepo.findByEmail.mockResolvedValue(false)
    expect(async () => {
      await authShopKeeperUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Invalid Email or Password')
  })

  it('Should throw an error if Email or Password is not valid', async () => {
    ShopKeeperVitestRepo.findByEmail.mockResolvedValue({
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
      await authShopKeeperUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Invalid Email or Password')
  })

  it('Should throw an error if ShopKeeper Contract is expired', async () => {
    ShopKeeperVitestRepo.findByEmail.mockResolvedValue(
      ShopKeeperFactory.withContract({
        name: 'Merian Cardoso',
        cpf: '63067078080',
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
        rg: '123456789',
        contract: {
          startDate: new Date('2023-08-30'),
          endDate: new Date(),
          value: 2000,
        },
      }),
    )
    mockBcryptAdapter.compare.mockResolvedValue(true)
    expect(async () => {
      await authShopKeeperUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Contract Expired')
  })

  it('Should throw an error if ShopKeeper Signature is expired', async () => {
    ShopKeeperVitestRepo.findByEmail.mockResolvedValue(
      ShopKeeperFactory.withSignature({
        name: 'Merian Cardoso',
        cpf: '63067078080',
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
        rg: '123456789',
        signature: {
          startDate: new Date('2022-09-15'),
          plan: SignaturePlanEnum.PREMIUM,
        },
      }),
    )
    mockBcryptAdapter.compare.mockResolvedValue(true)
    expect(async () => {
      await authShopKeeperUseCase.execute({
        email: 'merian.cardoso@example.com',
        password: 'AnotherP@ssw0rd',
      })
    }).rejects.toThrow('Signature Expired')
  })

  it('Should authenticate a ShopKeeper', async () => {
    ShopKeeperVitestRepo.findByEmail.mockResolvedValue({
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
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    mockJwtAdapter.sign.mockReturnValue(token)
    mockBcryptAdapter.compare.mockResolvedValue(true)
    const output = await authShopKeeperUseCase.execute({
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
    })
    expect(ShopKeeperVitestRepo.findByEmail).toBeCalledWith(
      'merian.cardoso@example.com',
    )
    expect(output).toBeTruthy()
    expect(output.token).toBe(token)
    expect(output.user.email).toBe('merian.cardoso@example.com')
  })
})
