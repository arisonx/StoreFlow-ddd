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

describe('RegisterShopKeeperInitialUseCase Unit Tests', () => {
  let registerShopKeeperInitialUseCase: RegisterShopKeeperInitialUseCase

  beforeEach(() => {
    registerShopKeeperInitialUseCase = new RegisterShopKeeperInitialUseCase(
      ShopKeeperInitialVitestRepo,
    )

    vi.clearAllMocks()
  })

  it('Should not register a ShopKeeper if e-mail already exists', async () => {
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(
      registerShopKeeperInitialUseCase.execute(inputDto),
    ).rejects.toThrow('ShopKeeper Register: E-mail already exists')
  })

  it('Should not register a ShopKeeper if CPF already exists', async () => {
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(false)
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(
      registerShopKeeperInitialUseCase.execute(inputDto),
    ).rejects.toThrow('ShopKeeper Register: CPF already exists')
  })

  it('Should not register a ShopKeeper if e-mail and cpf already exists', async () => {
    ShopKeeperInitialVitestRepo.emailAlreadyExists.mockReturnValue(true)
    ShopKeeperInitialVitestRepo.cpfAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(
      registerShopKeeperInitialUseCase.execute(inputDto),
    ).rejects.toThrow(
      'ShopKeeper Register: E-mail already exists, ShopKeeper Register: CPF already exists',
    )
  })
})
