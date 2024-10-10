import IRepository, {
  IResourceListInputProps,
  IResourceListOutputProps,
} from '@domain/base/repositories/base-repo.interface'
import ContractShopKeeper from '@domain/entities/user/contract_shopkeeper/contract-shop-keeper.entity'
import SignatureShopKeeper from '@domain/entities/user/signature_shopkeeper/signature-shop-keeper.entity'
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
