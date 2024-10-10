import { randomUUID } from 'node:crypto'
import CPF from '../../value_objects/cpf'
import Email from '../../value_objects/email'
import { Password } from '../../value_objects/password'
import RG from '../../value_objects/rg'
import ContractShopKeeper from '../../shopkeeper/contract/contract-shop-keeper.entity'
import Username from '../../value_objects/username'
import { IBaseUserCreationProps } from '../interfaces/user.interface'
import { Contract } from '../../shopkeeper/contract/contract'
import Signature, {
  SignaturePlanEnum,
} from '../../shopkeeper/signature/signature'
import SignatureShopKeeper from '../../shopkeeper/signature/signature-shop-keeper.entity'

export interface IWithContractProps extends IBaseUserCreationProps {
  contract: {
    startDate: Date
    endDate: Date
    value: number
  }
}

export interface IWithSignatureProps extends IBaseUserCreationProps {
  signature: {
    startDate: Date
    plan: SignaturePlanEnum
  }
}
export default class ShopKeeperFactory {
  static withContract({
    name,
    cpf,
    password,
    email,
    rg,
    contract,
  }: IWithContractProps): ContractShopKeeper {
    return new ContractShopKeeper({
      id: randomUUID(),
      name: new Username(name),
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
      contract: new Contract(contract),
    })
  }
  static withSignature({
    name,
    cpf,
    password,
    email,
    rg,
    signature,
  }: IWithSignatureProps): SignatureShopKeeper {
    return new SignatureShopKeeper({
      id: randomUUID(),
      name: new Username(name),
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
      signature: new Signature(signature.plan, signature.startDate),
    })
  }
}
