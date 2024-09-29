import RegisterShopKeeperWithContractUseCase from './register-shopkeeper.use-case'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ConflictError from 'domain/base/errors/conflict-error'
import { hash } from 'crypto'

const shopKeeperVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
  emailAlreadyExists: vi.fn(),
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
    ).rejects.toThrow(ConflictError)
    await expect(
      registerShopKeeperWithContractUseCase.execute(inputDto),
    ).rejects.toThrow('E-mail already exists')
  })

  it('Should register a ShopKeeper with Contract', async () => {
    shopKeeperVitestRepo.emailAlreadyExists.mockReturnValue(false)
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
