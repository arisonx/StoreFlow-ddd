import ShopKeeperFactory from '../../@shared/factories/shop-keeper.factory'
describe('ContractShopKeeper Unit Tests', () => {
  it('Should be able to return ContractShopKeeper', () => {
    const response = ShopKeeperFactory.withContract({
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
    })

    expect(response).toBeTruthy()
    expect(response.contract.value).toStrictEqual(4000)
  })
})
