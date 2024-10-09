import ShopKeeperInitialFactory from './factories/shoop-keeper.factory'
import { SignaturePlanEnum } from './signature'

describe('ShopKeeperInitial Unit Tests', () => {
  it('Should throw an error if ShopKeeperInitial does not have Signature or Contract', () => {
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

  it('Should create a ShopKeeperInitial with a Signature', () => {
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

    const ShopKeeperInitial = ShopKeeperInitialFactory.withSignature(data)

    expect(ShopKeeperInitial).toBeTruthy()
    expect(ShopKeeperInitial.name).toEqual(data.name)
    expect(ShopKeeperInitial.cpf).toEqual(data.cpf)
    expect(ShopKeeperInitial.email).toEqual(data.email)
    expect(ShopKeeperInitial.password).toEqual(data.password)
    expect(ShopKeeperInitial.rg).toEqual(data.rg)
    expect(ShopKeeperInitial.signature).toBeTruthy()

    if (ShopKeeperInitial.signature) {
      expect(ShopKeeperInitial.signature.plan).toEqual(data.signature.plan)
      expect(ShopKeeperInitial.signature.startDate).toEqual(
        data.signature.startDate,
      )
    }
  })

  it('Should create a ShopKeeperInitial with a Contract', () => {
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

    const ShopKeeperInitial = ShopKeeperInitialFactory.withContract(data)

    expect(ShopKeeperInitial).toBeTruthy()
    expect(ShopKeeperInitial.name).toEqual(data.name)
    expect(ShopKeeperInitial.cpf).toEqual(data.cpf)
    expect(ShopKeeperInitial.email).toEqual(data.email)
    expect(ShopKeeperInitial.password).toEqual(data.password)
    expect(ShopKeeperInitial.rg).toEqual(data.rg)
    expect(ShopKeeperInitial.contract).toBeTruthy()

    if (ShopKeeperInitial.contract) {
      expect(ShopKeeperInitial.contract.startDate).toEqual(
        data.contract.startDate,
      )
      expect(ShopKeeperInitial.contract.endDate).toEqual(data.contract.endDate)
      expect(ShopKeeperInitial.contract.value).toEqual(data.contract.value)
    }
  })

  it('Should throw an error if ShopKeeperInitial has both Signature and Contract', () => {
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
