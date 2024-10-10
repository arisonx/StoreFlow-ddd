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

describe('RegisterShopKeeperUseCase Unit Tests', () => {
  let registerShopKeeperUseCase: RegisterShopKeeperUseCase

  beforeEach(() => {
    registerShopKeeperUseCase = new RegisterShopKeeperUseCase(
      ShopKeeperVitestRepo,
    )

    vi.clearAllMocks()
  })

  it('Should not register a ShopKeeper if e-mail already exists', async () => {
    ShopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    ShopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(registerShopKeeperUseCase.execute(inputDto)).rejects.toThrow(
      'ShopKeeper Register: E-mail already exists',
    )
  })

  it('Should not register a ShopKeeper if CPF already exists', async () => {
    ShopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(registerShopKeeperUseCase.execute(inputDto)).rejects.toThrow(
      'ShopKeeper Register: CPF already exists',
    )
  })

  it('Should not register a ShopKeeper if e-mail and cpf already exists', async () => {
    ShopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(true)
    ShopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(registerShopKeeperUseCase.execute(inputDto)).rejects.toThrow(
      'ShopKeeper Register: E-mail already exists, ShopKeeper Register: CPF already exists',
    )
  })
})
