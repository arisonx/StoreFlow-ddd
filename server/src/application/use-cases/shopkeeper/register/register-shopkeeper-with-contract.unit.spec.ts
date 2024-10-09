import RegisterShopKeeperInitialWithContractUseCase from './register-shopkeeper-with-contract.use-case'
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

describe('RegisterShopKeeperInitialWithContractUseCase Unit Tests', () => {
  let registerShopKeeperInitialWithContractUseCase: RegisterShopKeeperInitialWithContractUseCase
  let registerShopKeeperInitialUseCase: RegisterShopKeeperInitialUseCase

  beforeEach(() => {
    registerShopKeeperInitialUseCase = new RegisterShopKeeperInitialUseCase(
      ShopKeeperInitialVitestRepo,
    )
    registerShopKeeperInitialWithContractUseCase =
      new RegisterShopKeeperInitialWithContractUseCase(
        ShopKeeperInitialVitestRepo,
        registerShopKeeperInitialUseCase,
        mockBcryptAdapter,
      )

    vi.clearAllMocks()
  })
  it('Should register a ShopKeeper with Contract', async () => {
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    const hashedPassword =
      '$2a$12$cw3kBusXPtNmL8vrVty4deGFPfCHN.16O8VY4hHMl4QcHeDRcBAP2'
    mockBcryptAdapter.hash.mockResolvedValue(hashedPassword)

    const inputDto = {
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

    const outputDto =
      await registerShopKeeperInitialWithContractUseCase.execute(inputDto)

    expect(outputDto).toEqual({
      id: expect.any(String),
      name: inputDto.name,
      cpf: inputDto.cpf,
      password: hashedPassword,
      email: inputDto.email,
      rg: inputDto.rg,
      contract: {
        startDate: inputDto.contract.startDate,
        endDate: inputDto.contract.endDate,
        value: inputDto.contract.value,
      },
    })

    expect(outputDto.password).toEqual(hashedPassword)
  })
})
