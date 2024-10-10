import IRepository, {
  IResourceListInputProps,
  IResourceListOutputProps,
} from '@domain/@shared/repositories/base-repo.interface'
import ContractShopKeeper from '../contract/contract-shop-keeper.entity'
import SignatureShopKeeper from '../signature/signature-shop-keeper.entity'
export interface IShopKeeperListInputProps extends IResourceListInputProps {
  name?: string
}
export default abstract class IShopKeeperRepository
  implements
    IRepository<
      ContractShopKeeper | SignatureShopKeeper,
      IShopKeeperListInputProps
    >
{
  abstract count(): Promise<number>

  abstract findByEmail(
    email: string,
  ): Promise<ContractShopKeeper | SignatureShopKeeper | undefined>

  abstract emailAlreadyExists(email: string): Promise<boolean>

  abstract cpfAlreadyExists(cpf: string): Promise<boolean>

  abstract create(
    entity: ContractShopKeeper | SignatureShopKeeper,
  ): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract findOne(
    id: string,
  ): Promise<ContractShopKeeper | SignatureShopKeeper>

  abstract findAll(
    options: IShopKeeperListInputProps,
  ): Promise<IResourceListOutputProps<ContractShopKeeper | SignatureShopKeeper>>

  abstract update(id: string): Promise<void>
}
