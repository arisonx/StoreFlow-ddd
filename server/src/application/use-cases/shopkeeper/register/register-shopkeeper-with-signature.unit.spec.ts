import { SignaturePlanEnum } from '@domain/entities/user/shopkeeper/signature/signature'
import { RegisterShopKeeperWithSignatureUseCase } from './register-shopkeeper-with-signature.use-case'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'

const ShopKeeperVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
  emailAlreadyExists: vi.fn(),
  cpfAlreadyExists: vi.fn(),
  findByEmail: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
}

const mockBcryptAdapter = {
  hash: vi.fn(),
  compare: vi.fn(),
}

describe('RegisterShopKeeperWithSignatureUseCase Unit Tests', () => {
  let registerShopKeeperWithSignatureUseCase: RegisterShopKeeperWithSignatureUseCase
  let registerShopKeeperUseCase: RegisterShopKeeperUseCase

  beforeEach(() => {
    registerShopKeeperUseCase = new RegisterShopKeeperUseCase(
      ShopKeeperVitestRepo,
    )
    registerShopKeeperWithSignatureUseCase =
      new RegisterShopKeeperWithSignatureUseCase(
        ShopKeeperVitestRepo,
        registerShopKeeperUseCase,
        mockBcryptAdapter,
      )

    vi.clearAllMocks()
  })

  it('Should register a ShopKeeper with Starter Signature', async () => {
    ShopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    const hashedPassword =
      '$2a$12$cw3kBusXPtNmL8vrVty4deGFPfCHN.16O8VY4hHMl4QcHeDRcBAP2'
    mockBcryptAdapter.hash.mockResolvedValue(hashedPassword)

    const inputDto = {
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      signature: {
        startDate: new Date('2024-01-15'),
        plan: SignaturePlanEnum.STARTER,
      },
    }

    const outputDto =
      await registerShopKeeperWithSignatureUseCase.execute(inputDto)

    expect(outputDto).toEqual({
      id: expect.any(String),
      name: inputDto.name,
      cpf: inputDto.cpf,
      password: hashedPassword,
      email: inputDto.email,
      rg: inputDto.rg,
      signature: {
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        plan: SignaturePlanEnum.STARTER,
      },
    })

    expect(outputDto.password).toEqual(hashedPassword)
  })

  it('Should register a ShopKeeper with Basic Signature', async () => {
    ShopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    const hashedPassword =
      '$2a$12$cw3kBusXPtNmL8vrVty4deGFPfCHN.16O8VY4hHMl4QcHeDRcBAP2'
    mockBcryptAdapter.hash.mockResolvedValue(hashedPassword)

    const inputDto = {
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      signature: {
        startDate: new Date('2024-01-15'),
        plan: SignaturePlanEnum.BASIC,
      },
    }

    const outputDto =
      await registerShopKeeperWithSignatureUseCase.execute(inputDto)

    expect(outputDto).toEqual({
      id: expect.any(String),
      name: inputDto.name,
      cpf: inputDto.cpf,
      password: hashedPassword,
      email: inputDto.email,
      rg: inputDto.rg,
      signature: {
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-07-15'),
        plan: SignaturePlanEnum.BASIC,
      },
    })

    expect(outputDto.password).toEqual(hashedPassword)
  })

  it('Should register a ShopKeeper with Premium Signature', async () => {
    ShopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    const hashedPassword =
      '$2a$12$cw3kBusXPtNmL8vrVty4deGFPfCHN.16O8VY4hHMl4QcHeDRcBAP2'
    mockBcryptAdapter.hash.mockResolvedValue(hashedPassword)

    const inputDto = {
      name: 'Merian Cardoso',
      cpf: '63067078080',
      email: 'merian.cardoso@example.com',
      password: 'AnotherP@ssw0rd',
      rg: '123456789',
      signature: {
        startDate: new Date('2024-01-15'),
        plan: SignaturePlanEnum.PREMIUM,
      },
    }

    const outputDto =
      await registerShopKeeperWithSignatureUseCase.execute(inputDto)

    expect(outputDto).toEqual({
      id: expect.any(String),
      name: inputDto.name,
      cpf: inputDto.cpf,
      password: hashedPassword,
      email: inputDto.email,
      rg: inputDto.rg,
      signature: {
        startDate: new Date('2024-01-15'),
        endDate: new Date('2025-01-15'),
        plan: SignaturePlanEnum.PREMIUM,
      },
    })

    expect(outputDto.password).toEqual(hashedPassword)
  })
})
