import ShopKeeperInitial from '@domain/entities/user/shoop-keeper.entity'

export class ShopKeeperInitialMapper {
  public static toOutput(ShopKeeperInitial: ShopKeeperInitial) {
    const hasSignature = ShopKeeperInitial.signature && {
      signature: {
        startDate: ShopKeeperInitial.signature?.startDate,
        endDate: ShopKeeperInitial.signature?.endDate,
        plan: ShopKeeperInitial.signature?.plan,
      },
    }

    const hasContract = ShopKeeperInitial.contract && {
      contract: {
        startDate: ShopKeeperInitial.contract.startDate,
        endDate: ShopKeeperInitial.contract.endDate,
        value: ShopKeeperInitial.contract.value,
      },
    }

    return {
      id: ShopKeeperInitial.id,
      name: ShopKeeperInitial.name,
      cpf: ShopKeeperInitial.cpf,
      email: ShopKeeperInitial.email,
      rg: ShopKeeperInitial.rg,
      ...hasSignature,
      ...hasContract,
    }
  }

  public static toOutputWithSignature(ShopKeeperInitial: ShopKeeperInitial) {
    if (ShopKeeperInitial.signature) {
      return {
        id: ShopKeeperInitial.id,
        name: ShopKeeperInitial.name,
        cpf: ShopKeeperInitial.cpf,
        password: ShopKeeperInitial.password,
        email: ShopKeeperInitial.email,
        rg: ShopKeeperInitial.rg,
        signature: {
          startDate: ShopKeeperInitial.signature.startDate,
          endDate: ShopKeeperInitial.signature.endDate,
          plan: ShopKeeperInitial.signature.plan,
        },
      }
    }

    return {
      id: ShopKeeperInitial.id,
      name: ShopKeeperInitial.name,
      cpf: ShopKeeperInitial.cpf,
      password: ShopKeeperInitial.password,
      email: ShopKeeperInitial.email,
      rg: ShopKeeperInitial.rg,
    }
  }

  public static toOutputWithContract(ShopKeeperInitial: ShopKeeperInitial) {
    if (ShopKeeperInitial.contract) {
      return {
        id: ShopKeeperInitial.id,
        name: ShopKeeperInitial.name,
        cpf: ShopKeeperInitial.cpf,
        password: ShopKeeperInitial.password,
        email: ShopKeeperInitial.email,
        rg: ShopKeeperInitial.rg,
        contract: {
          startDate: ShopKeeperInitial.contract.startDate,
          endDate: ShopKeeperInitial.contract.endDate,
          value: ShopKeeperInitial.contract.value,
        },
      }
    }

    return {
      id: ShopKeeperInitial.id,
      name: ShopKeeperInitial.name,
      cpf: ShopKeeperInitial.cpf,
      password: ShopKeeperInitial.password,
      email: ShopKeeperInitial.email,
      rg: ShopKeeperInitial.rg,
    }
  }
}
