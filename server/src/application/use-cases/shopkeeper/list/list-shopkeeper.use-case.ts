import IShopKeeperRepository, {
  IShopKeeperListInputProps,
} from '@domain/user/shopkeeper/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../../../../domain/user/@shared/mapper/shop-keeper.mapper'
import { IListShopKeeperInputDto } from './dto/input'
import ContractShopKeeper from '@domain/user/shopkeeper/contract/contract-shop-keeper.entity'
import SignatureShopKeeper from '@domain/user/shopkeeper/signature/signature-shop-keeper.entity'
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
      items: result.items.map((item) =>
        ShopKeeperMapper.toOutput(
          item as ContractShopKeeper | SignatureShopKeeper,
        ),
      ),
    }
  }
}
