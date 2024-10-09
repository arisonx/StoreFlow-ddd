import { SignaturePlanEnum } from '@domain/entities/user/signature'
import { RegisterShopKeeperInitialWithSignatureUseCase } from './register-shopkeeper-with-signature.use-case'
import { RegisterShopKeeperInitialUseCase } from './register-shopkeeper.use-case'

const ShopKeeperInitialVitestRepo = {
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

describe('RegisterShopKeeperInitialWithSignatureUseCase Unit Tests', () => {
  let registerShopKeeperInitialWithSignatureUseCase: RegisterShopKeeperInitialWithSignatureUseCase
  let registerShopKeeperInitialUseCase: RegisterShopKeeperInitialUseCase

  beforeEach(() => {
    registerShopKeeperInitialUseCase = new RegisterShopKeeperInitialUseCase(
      ShopKeeperInitialVitestRepo,
    )
    registerShopKeeperInitialWithSignatureUseCase =
      new RegisterShopKeeperInitialWithSignatureUseCase(
        ShopKeeperInitialVitestRepo,
        registerShopKeeperInitialUseCase,
        mockBcryptAdapter,
      )

    vi.clearAllMocks()
  })

  it('Should register a ShopKeeperInitial with Starter Signature', async () => {
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(false)
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
      await registerShopKeeperInitialWithSignatureUseCase.execute(inputDto)

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

  it('Should register a ShopKeeperInitial with Basic Signature', async () => {
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(false)
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
      await registerShopKeeperInitialWithSignatureUseCase.execute(inputDto)

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

  it('Should register a ShopKeeperInitial with Premium Signature', async () => {
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(false)
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
      await registerShopKeeperInitialWithSignatureUseCase.execute(inputDto)

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
