import RegisterShopKeeperWithContractUseCase from './register-shopkeeper.use-case'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const shopKeeperVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
  emailAlreadyExists: vi.fn(),
  cpfAlreadyExists: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
}

const mockBcryptAdapter = {
  hash: vi.fn(),
  compare: vi.fn(),
}

describe('RegisterShopKeeperWithContractUseCase Unit Tests', () => {
  let registerShopKeeperWithContractUseCase

  beforeEach(() => {
    registerShopKeeperWithContractUseCase =
      new RegisterShopKeeperWithContractUseCase(
        shopKeeperVitestRepo,
        mockBcryptAdapter,
      )

    vi.clearAllMocks()
  })

  it('Should not register a ShopKeeper if e-mail already exists', async () => {
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(true)

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

    await expect(
      registerShopKeeperWithContractUseCase.execute(inputDto),
    ).rejects.toThrow('ShopKeeper Register: E-mail already exists')
  })

  it('Should not register a ShopKeeper if CPF already exists', async () => {
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(true)

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

    await expect(
      registerShopKeeperWithContractUseCase.execute(inputDto),
    ).rejects.toThrow('ShopKeeper Register: CPF already exists')
  })

  it('Should not register a ShopKeeper if e-mail and cpf already exists', async () => {
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(true)
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(true)

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

    await expect(
      registerShopKeeperWithContractUseCase.execute(inputDto),
    ).rejects.toThrow(
      'ShopKeeper Register: E-mail already exists, ShopKeeper Register: CPF already exists',
    )
  })

  it('Should register a ShopKeeper with Contract', async () => {
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
    shopKeeperVitestRepo.cpfAlreadyExists.mockReturnValue(false)
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
      await registerShopKeeperWithContractUseCase.execute(inputDto)

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
