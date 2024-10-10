import ContractShopKeeper from '../../shopkeeper/contract/contract-shop-keeper.entity'
import SignatureShopKeeper from '../../shopkeeper/signature/signature-shop-keeper.entity'

export class ShopKeeperMapper {
  public static toOutput(ShopKeeper: ContractShopKeeper | SignatureShopKeeper) {
    if (ShopKeeper instanceof ContractShopKeeper) {
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
        ...hasContract,
      }
    }

    if (ShopKeeper instanceof SignatureShopKeeper) {
      const hasSignature = ShopKeeper.signature && {
        signature: {
          startDate: ShopKeeper.signature?.startDate,
          endDate: ShopKeeper.signature?.endDate,
          plan: ShopKeeper.signature?.plan,
        },
      }
      return {
        id: ShopKeeper.id,
        name: ShopKeeper.name,
        cpf: ShopKeeper.cpf,
        email: ShopKeeper.email,
        rg: ShopKeeper.rg,
        ...hasSignature,
      }
    }
  }

  public static toOutputWithSignature(ShopKeeper: SignatureShopKeeper) {
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

  public static toOutputWithContract(ShopKeeper: ContractShopKeeper) {
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
