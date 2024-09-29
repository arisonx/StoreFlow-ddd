import IShopKeeperRepository from 'domain/repositories/shopkeeper-repository.abstract'
import NotFoundError from 'domain/base/errors/not-found.error'
import { ShopKeeperMapper } from '../shop-keeper.mapper'

export class FindShopKeeperUseCase {
  constructor(private readonly shopKeeperRepo: IShopKeeperRepository) {}

  async execute(input: string) {
    const shopKeeper = await this.shopKeeperRepo.findOne(input)

    if (!shopKeeper) {
      throw new NotFoundError('ShopKeeper not found')
    }

    return ShopKeeperMapper.toOutput(shopKeeper)
  }
}
