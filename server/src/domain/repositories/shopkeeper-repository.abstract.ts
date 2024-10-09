import IRepository, {
  IResourceListInputProps,
  IResourceListOutputProps,
} from '@domain/base/repositories/base-repo.interface'
import ShopKeeper from '@domain/entities/user/shoop-keeper.entity'

export interface IShopKeeperInitialListInputProps
  extends IResourceListInputProps {
  name?: string
}

export default abstract class IShopKeeperInitialRepository
  implements IRepository<ShopKeeper, IShopKeeperInitialListInputProps>
{
  abstract count(): Promise<number>

  abstract findByEmail(email: string): Promise<ShopKeeper | undefined>

  abstract emailAlreadyExists(email: string): Promise<boolean>

  abstract cpfAlreadyExists(cpf: string): Promise<boolean>

  abstract create(entity: ShopKeeper): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract findOne(id: string): Promise<ShopKeeper>

  abstract findAll(
    options: IShopKeeperInitialListInputProps,
  ): Promise<IResourceListOutputProps<ShopKeeper>>

  abstract update(id: string): Promise<void>
}
