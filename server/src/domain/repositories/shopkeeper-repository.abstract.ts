import IRepository, {
  IResourceListOutputProps,
} from 'domain/base/repositories/base-repo.interface'
import ShopKeeper from 'domain/entities/user/shoop-keeper.entity'

export interface IShopKeeperListInputProps {}

export default abstract class IShopKeeperRepository
  implements IRepository<ShopKeeper, IShopKeeperListInputProps>
{
  abstract count(): Promise<number>

  abstract emailAlreadyExists(email: string): Promise<boolean>

  abstract create(entity: ShopKeeper): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract findOne(id: string): Promise<ShopKeeper>

  abstract findAll(
    options: IShopKeeperListInputProps,
  ): Promise<IResourceListOutputProps<ShopKeeper>>

  abstract update(id: string): Promise<void>
}
