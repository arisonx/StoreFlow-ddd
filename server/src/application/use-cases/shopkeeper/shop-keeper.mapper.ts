import ShopKeeper from 'domain/entities/user/shoop-keeper.entity'

export class ShopKeeperMapper {
  public static toOutput(shopKeeper: ShopKeeper) {
    const hasSignature = shopKeeper.signature && {
      signature: {
        startDate: shopKeeper.signature?.startDate,
        endDate: shopKeeper.signature?.endDate,
        plan: shopKeeper.signature?.plan,
      },
    }

    const hasContract = shopKeeper.contract && {
      contract: {
        startDate: shopKeeper.contract.startDate,
        endDate: shopKeeper.contract.endDate,
        value: shopKeeper.contract.value,
      },
    }

    return {
      id: shopKeeper.id,
      name: shopKeeper.name,
      cpf: shopKeeper.cpf,
      email: shopKeeper.email,
      rg: shopKeeper.rg,
      ...hasSignature,
      ...hasContract,
    }
  }

  public static toOutputWithSignature(shopKeeper: ShopKeeper) {
    return {
      id: shopKeeper.id,
      name: shopKeeper.name,
      cpf: shopKeeper.cpf,
      password: shopKeeper.password,
      email: shopKeeper.email,
      rg: shopKeeper.rg,
      signature: {
        startDate: shopKeeper.signature.startDate,
        endDate: shopKeeper.signature.endDate,
        plan: shopKeeper.signature.plan,
      },
    }
  }

  public static toOutputWithContract(shopKeeper: ShopKeeper) {
    return {
      id: shopKeeper.id,
      name: shopKeeper.name,
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
