import IShopKeeperRepository from 'domain/repositories/shopkeeper-repository.abstract'
import { IListShopKeeperInputDto } from './dto/input'
import { ShopKeeperMapper } from '../shop-keeper.mapper'

export class ListShopKeeperUseCase {
  constructor(private readonly shopKeeperRepo: IShopKeeperRepository) {}

  async execute(dto?: IListShopKeeperInputDto) {
    const result = await this.shopKeeperRepo.findAll(dto);
    return {
      ...result,
      items: result.items.map(ShopKeeperMapper.toOutput),
    }
  }
}
