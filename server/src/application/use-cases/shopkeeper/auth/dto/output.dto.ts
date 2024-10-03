import { ShopKeeperMapper } from '../../shop-keeper.mapper'

export interface IAuthShopKeeperOutputDto
  extends ReturnType<typeof ShopKeeperMapper.toOutput> {}
