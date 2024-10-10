import IRepository, {
  IResourceListInputProps,
  IResourceListOutputProps,
} from '@domain/base/repositories/base-repo.interface'
import ShopKeeper from '@domain/entities/user/shop-keeper.entity'

export interface IShopKeeperListInputProps extends IResourceListInputProps {
  name?: string
}

export default abstract class IShopKeeperRepository
  implements IRepository<ShopKeeper, IShopKeeperListInputProps>
{
  abstract count(): Promise<number>

  abstract findByEmail(email: string): Promise<ShopKeeper | undefined>

  abstract emailAlreadyExists(email: string): Promise<boolean>

  abstract cpfAlreadyExists(cpf: string): Promise<boolean>

  abstract create(entity: ShopKeeper): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract findOne(id: string): Promise<ShopKeeper>

  abstract findAll(
    options: IShopKeeperListInputProps,
  ): Promise<IResourceListOutputProps<ShopKeeper>>

  abstract update(id: string): Promise<void>
}
