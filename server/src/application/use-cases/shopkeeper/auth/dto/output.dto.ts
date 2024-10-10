import { ShopKeeperMapper } from '../../shop-keeper.mapper'

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IAuthShopKeeperOutputDto
  extends ReturnType<typeof ShopKeeperMapper.toOutput> {}
