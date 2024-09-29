import RegisterShopKeeperWithContractUseCase from './register-shopkeeper.use-case'
import { describe, it, expect, vi } from 'vitest'

const shopKeeperVitestRepo = {
  findOne: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  count: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
}
describe('RegisterShopKeeperWithContractUseCase Unit Tests', () => {
  it('Should register a ShopKeeper with Contract', async () => {
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

    const registerShopKeeperWithContractUseCase =
      new RegisterShopKeeperWithContractUseCase(shopKeeperVitestRepo)

    const outputDto =
      await registerShopKeeperWithContractUseCase.execute(inputDto)

    expect(outputDto).toEqual({
      id: expect.any(String),
      name: outputDto.name,
      cpf: outputDto.cpf,
      password: outputDto.password,
      email: outputDto.email,
      rg: outputDto.rg,
      contract: {
        startDate: outputDto.contract.startDate,
        endDate: outputDto.contract.endDate,
        value: outputDto.contract.value,
      },
    })
  })
})
