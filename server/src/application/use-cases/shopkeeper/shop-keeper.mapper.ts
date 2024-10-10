import ShopKeeper from '@domain/entities/user/shop-keeper.entity'

export class ShopKeeperMapper {
  public static toOutput(ShopKeeper: ShopKeeper) {
    const hasSignature = ShopKeeper.signature && {
      signature: {
        startDate: ShopKeeper.signature?.startDate,
        endDate: ShopKeeper.signature?.endDate,
        plan: ShopKeeper.signature?.plan,
      },
    }

    const hasContract = ShopKeeper.contract && {
      contract: {
        startDate: ShopKeeper.contract.startDate,
        endDate: ShopKeeper.contract.endDate,
        value: ShopKeeper.contract.value,
      },
    }

    return {
      id: ShopKeeper.id,
      name: ShopKeeper.name,
      cpf: ShopKeeper.cpf,
      email: ShopKeeper.email,
      rg: ShopKeeper.rg,
      ...hasSignature,
      ...hasContract,
    }
  }

  public static toOutputWithSignature(ShopKeeper: ShopKeeper) {
    if (ShopKeeper.signature) {
      return {
        id: ShopKeeper.id,
        name: ShopKeeper.name,
        cpf: ShopKeeper.cpf,
        password: ShopKeeper.password,
        email: ShopKeeper.email,
        rg: ShopKeeper.rg,
        signature: {
          startDate: ShopKeeper.signature.startDate,
          endDate: ShopKeeper.signature.endDate,
          plan: ShopKeeper.signature.plan,
        },
      }
    }

    return {
      id: ShopKeeper.id,
      name: ShopKeeper.name,
      cpf: ShopKeeper.cpf,
      password: ShopKeeper.password,
      email: ShopKeeper.email,
      rg: ShopKeeper.rg,
    }
  }

  public static toOutputWithContract(ShopKeeper: ShopKeeper) {
    if (ShopKeeper.contract) {
      return {
        id: ShopKeeper.id,
        name: ShopKeeper.name,
        cpf: ShopKeeper.cpf,
        password: ShopKeeper.password,
        email: ShopKeeper.email,
        rg: ShopKeeper.rg,
        contract: {
          startDate: ShopKeeper.contract.startDate,
          endDate: ShopKeeper.contract.endDate,
          value: ShopKeeper.contract.value,
        },
      }
    }

    return {
      id: ShopKeeper.id,
      name: ShopKeeper.name,
      cpf: ShopKeeper.cpf,
      password: ShopKeeper.password,
      email: ShopKeeper.email,
      rg: ShopKeeper.rg,
    }
  }
}
