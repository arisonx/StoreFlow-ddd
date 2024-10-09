import IRepository, {
  IResourceListInputProps,
  IResourceListOutputProps,
} from '@domain/base/repositories/base-repo.interface'
import ShopKeeperInitial from '@domain/entities/user/shoop-keeper.entity'

export interface IShopKeeperInitialListInputProps
  extends IResourceListInputProps {
  name?: string
}

export default abstract class IShopKeeperInitialRepository
  implements IRepository<ShopKeeperInitial, IShopKeeperInitialListInputProps>
{
  abstract count(): Promise<number>

  abstract findByEmail(email: string): Promise<ShopKeeperInitial | undefined>

  abstract emailAlreadyExists(email: string): Promise<boolean>

  abstract cpfAlreadyExists(cpf: string): Promise<boolean>

  abstract create(entity: ShopKeeperInitial): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract findOne(id: string): Promise<ShopKeeperInitial>

  abstract findAll(
    options: IShopKeeperInitialListInputProps,
  ): Promise<IResourceListOutputProps<ShopKeeperInitial>>

  abstract update(id: string): Promise<void>
}
