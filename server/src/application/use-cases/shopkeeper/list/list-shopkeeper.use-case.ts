import IShopKeeperRepository, {
  IShopKeeperListInputProps,
} from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../../../../domain/entities/user/@shared/mapper/shop-keeper.mapper'
import { IListShopKeeperInputDto } from './dto/input'
export class ListShopKeeperUseCase {
  constructor(private readonly ShopKeeperRepo: IShopKeeperRepository) {}
  async execute(dto?: IListShopKeeperInputDto) {
    const input: IShopKeeperListInputProps = {
      all: dto?.all,
      limit: dto?.limit,
      name: dto?.name,
      offset: dto?.offset,
    }

    const result = await this.ShopKeeperRepo.findAll(input)

    return {
      ...result,
      items: result.items.map(ShopKeeperMapper.toOutput),
    }
  }
}
