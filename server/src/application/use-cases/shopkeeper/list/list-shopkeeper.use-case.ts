import IShopKeeperInitialRepository, {
  IShopKeeperInitialListInputProps,
} from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperInitialMapper } from '../shop-keeper.mapper'
import { IListShopKeeperInitialInputDto } from './dto/input'

export class ListShopKeeperInitialUseCase {
  constructor(
    private readonly ShopKeeperInitialRepo: IShopKeeperInitialRepository,
  ) {}

  async execute(dto?: IListShopKeeperInitialInputDto) {
    const input: IShopKeeperInitialListInputProps = {
      all: dto?.all,
      limit: dto?.limit,
      name: dto?.name,
      offset: dto?.offset,
    }

    const result = await this.ShopKeeperInitialRepo.findAll(input)

    return {
      ...result,
      items: result.items.map(ShopKeeperInitialMapper.toOutput),
    }
  }
}
