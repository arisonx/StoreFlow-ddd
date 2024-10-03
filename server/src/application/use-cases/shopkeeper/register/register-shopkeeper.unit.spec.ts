import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'

const shopKeeperVitestRepo = {
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
      shopKeeperVitestRepo,
    )

    vi.clearAllMocks()
  })

  it('Should not register a ShopKeeper if e-mail already exists', async () => {
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(registerShopKeeperUseCase.execute(inputDto)).rejects.toThrow(
      'ShopKeeper Register: E-mail already exists',
    )
  })

  it('Should not register a ShopKeeper if CPF already exists', async () => {
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(registerShopKeeperUseCase.execute(inputDto)).rejects.toThrow(
      'ShopKeeper Register: CPF already exists',
    )
  })

  it('Should not register a ShopKeeper if e-mail and cpf already exists', async () => {
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(true)
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(true)

    const inputDto = {
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
    }

    await expect(registerShopKeeperUseCase.execute(inputDto)).rejects.toThrow(
      'ShopKeeper Register: E-mail already exists, ShopKeeper Register: CPF already exists',
    )
  })
})
