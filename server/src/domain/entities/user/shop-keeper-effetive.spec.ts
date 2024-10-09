import ShopKeeperEffectiveFactory from './factories/shop-keeper-effective.factory'
import { SignaturePlanEnum } from './signature'

describe('ShopKeeperEffective Unit Tests', () => {
  it('Should be able to return ShopKeeperEffective with signature and contract', () => {
    const response = ShopKeeperEffectiveFactory.withAllCredentials({
      name: 'Luis Fernando',
      cpf: '63067078080',
      email: 'luisfernandogvv@gmail.com',
      password: 'S3curityP@ssw0rd',
      rg: '435144820',
      contract: {
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-10'),
        value: 4000,
      },
      signature: {
        plan: SignaturePlanEnum.BASIC,
        startDate: new Date('2024-10-01'),
      },
    })

    expect(response).toBeTruthy()
    expect(response.contract.value).toStrictEqual(4000)
    expect(response.signature.plan).toStrictEqual('Basic')
  })
})
