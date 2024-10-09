import { IResourceListInputProps } from '@domain/base/repositories/base-repo.interface'

export interface IListShopKeeperInitialInputDto
  extends IResourceListInputProps {
  name?: string
}
