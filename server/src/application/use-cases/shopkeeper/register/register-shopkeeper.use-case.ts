import ShopKeeperFactory from '../../../../domain/entities/user/factories/shoop-keeper.facotry'
import IShopKeeperRepository from '../../../../domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperWithContractInputProps from './dto/input.interface'

export default class RegisterShopKeeperWithContractUseCase {
  constructor(private readonly shopKeeperRepo: IShopKeeperRepository) {}

  async execute(dto: IRegisterShopKeeperWithContractInputProps) {
    const shopKeeper = ShopKeeperFactory.withContract(dto)

    await this.shopKeeperRepo.create(shopKeeper)

    return ShopKeeperMapper.toOutput(shopKeeper)
  }
}
