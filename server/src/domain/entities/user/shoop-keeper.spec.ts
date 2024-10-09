import ShopKeeperInitialFactory from './factories/shoop-keeper.factory'
import { SignaturePlanEnum } from './signature'

describe('ShopKeeper Unit Tests', () => {
  it('Should throw an error if ShopKeeper does not have Signature or Contract', () => {
    expect(() => {
      ShopKeeperInitialFactory.withBasicCredentials({
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

    const ShopKeeper = ShopKeeperInitialFactory.withSignature(data)

    expect(ShopKeeper).toBeTruthy()
    expect(ShopKeeper.name).toEqual(data.name)
    expect(ShopKeeper.cpf).toEqual(data.cpf)
    expect(ShopKeeper.email).toEqual(data.email)
    expect(ShopKeeper.password).toEqual(data.password)
    expect(ShopKeeper.rg).toEqual(data.rg)
    expect(ShopKeeper.signature).toBeTruthy()

    if (ShopKeeper.signature) {
      expect(ShopKeeper.signature.plan).toEqual(data.signature.plan)
      expect(ShopKeeper.signature.startDate).toEqual(data.signature.startDate)
    }
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

    const ShopKeeper = ShopKeeperInitialFactory.withContract(data)

    expect(ShopKeeper).toBeTruthy()
    expect(ShopKeeper.name).toEqual(data.name)
    expect(ShopKeeper.cpf).toEqual(data.cpf)
    expect(ShopKeeper.email).toEqual(data.email)
    expect(ShopKeeper.password).toEqual(data.password)
    expect(ShopKeeper.rg).toEqual(data.rg)
    expect(ShopKeeper.contract).toBeTruthy()

    if (ShopKeeper.contract) {
      expect(ShopKeeper.contract.startDate).toEqual(data.contract.startDate)
      expect(ShopKeeper.contract.endDate).toEqual(data.contract.endDate)
      expect(ShopKeeper.contract.value).toEqual(data.contract.value)
    }
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
      ShopKeeperInitialFactory.withContractAndSignature(data)
    }).toThrow('It is not possible to have a contract and a signature')
  })
})
