import ShopKeeperFactory from './factories/shoop-keeper.facotry'
import { SignaturePlanEnum } from './signature'
import { describe, it, expect } from 'vitest'
describe('ShopKeeper Unit Tests', () => {
  it('Should throw an error if ShopKeeper does not have Signature or Contract', () => {
    expect(() => {
      ShopKeeperFactory.withBasicCredentials({
        name: 'Luis Fernando',
        cpf: '63067078080',
        email: 'luisfernandogvv@gmail.com',
        password: 'S3curityP@ssw0rd',
        rg: '435144820',
      })
    }).toThrow('Signature or Contract is Required')
  })

  it('Should create a ShopKeeper with a Signature', () => {
    const data = {
      name: 'Luis Fernando',
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
      password: 'S3curityP@ssw0rd',
      rg: '435144820',
      signature: {
        startDate: new Date('2024-09-01'),
        plan: SignaturePlanEnum.PREMIUM,
      },
    }

    const shopKeeper = ShopKeeperFactory.withSignature(data)

    expect(shopKeeper).toBeTruthy()
    expect(shopKeeper.name).toEqual(data.name)
    expect(shopKeeper.cpf).toEqual(data.cpf)
    expect(shopKeeper.email).toEqual(data.email)
    expect(shopKeeper.password).toEqual(data.password)
    expect(shopKeeper.rg).toEqual(data.rg)
    expect(shopKeeper.signature).toBeTruthy()
    expect(shopKeeper.signature.plan).toEqual(data.signature.plan)
    expect(shopKeeper.signature.startDate).toEqual(data.signature.startDate)
  })

  it('Should create a ShopKeeper with a Contract', () => {
    const data = {
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

    const shopKeeper = ShopKeeperFactory.withContract(data)

    expect(shopKeeper).toBeTruthy()
    expect(shopKeeper.name).toEqual(data.name)
    expect(shopKeeper.cpf).toEqual(data.cpf)
    expect(shopKeeper.email).toEqual(data.email)
    expect(shopKeeper.password).toEqual(data.password)
    expect(shopKeeper.rg).toEqual(data.rg)
    expect(shopKeeper.contract).toBeTruthy()
    expect(shopKeeper.contract.startDate).toEqual(data.contract.startDate)
    expect(shopKeeper.contract.endDate).toEqual(data.contract.endDate)
    expect(shopKeeper.contract.value).toEqual(data.contract.value)
  })

  it('Should throw an error if ShopKeeper has both Signature and Contract', () => {
    const data = {
      name: 'Luis Fernando',
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
      password: 'S3curityP@ssw0rd',
      rg: '435144820',
      signature: {
        startDate: new Date('2024-09-01'),
        plan: SignaturePlanEnum.PREMIUM,
      },
      contract: {
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-01'),
        value: 2000,
      },
    }

    expect(() => {
      ShopKeeperFactory.withContractAndSignature(data)
    }).toThrow('It is not possible to have a contract and a signature')
  })
})
