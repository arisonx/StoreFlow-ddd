import ShopKeeperFactory from '../../../domain/entities/user/factories/shoop-keeper.facotry'
import IShopKeeperRepository from '../../../domain/repositories/shopkeeper-repository.abstract'
import IRegisterShopKeeperWithContractInputProps from './dto/input.interface'

export default class RegisterShopKeeperWithContractUseCase {
  constructor(private readonly shopKeeperRepo: IShopKeeperRepository) {}

  async execute(dto: IRegisterShopKeeperWithContractInputProps) {
    const shopKeeper = ShopKeeperFactory.withContract(dto)

    await this.shopKeeperRepo.create(shopKeeper)

    return {
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
