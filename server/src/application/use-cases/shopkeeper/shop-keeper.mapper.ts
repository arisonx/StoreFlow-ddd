import ShopKeeper from 'domain/entities/user/shoop-keeper.entity'

export class ShopKeeperMapper {
  public static toOutput(shopKeeper: ShopKeeper) {
    return {
      id: shopKeeper.id,
      name: shopKeeper.cpf,
      cpf: shopKeeper.cpf,
      password: shopKeeper.password,
      email: shopKeeper.email,
      rg: shopKeeper.rg,
      contract: {
        startDate: shopKeeper.contract.startDate,
        endDate: shopKeeper.contract.endDate,
        value: shopKeeper.contract.value,
      },
    }
  }
}
