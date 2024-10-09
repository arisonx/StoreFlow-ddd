import { ShopKeeperInitialMapper } from '../../shop-keeper.mapper'

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IAuthShopKeeperInitialOutputDto
  extends ReturnType<typeof ShopKeeperInitialMapper.toOutput> {}
