import { randomUUID } from 'node:crypto'
import { Contract } from '../contract'
import CPF from '../cpf'
import Email from '../email'
import { Password } from '../password'
import RG from '../rg'
import ShopKeeper from '../shop-keeper.entity'
import Signature, { SignaturePlanEnum } from '../signature'
import Username from '../username'

export interface CommonShopKeeperFactoryInputProps {
  name: string
  cpf: string
  password: string
  email: string
  rg: string
}

export type IWithCredentialsInputProps = CommonShopKeeperFactoryInputProps
export interface IWithCredentialsAndSignatureInputProps
  extends CommonShopKeeperFactoryInputProps {
  signature: {
    plan: SignaturePlanEnum
    startDate: Date
  }
}
export interface IWithCredentialsAndContractInputProps
  extends CommonShopKeeperFactoryInputProps {
  contract: {
    startDate: Date
    endDate: Date
    value: number
  }
}

export interface IWithCredentialsAndContractSignatureInputProps
  extends IWithCredentialsAndContractInputProps,
    IWithCredentialsAndSignatureInputProps {}

export default class ShopKeeperFactory {
  static withBasicCredentials({
    name,
    cpf,
    password,
    email,
    rg,
  }: IWithCredentialsInputProps) {
    return new ShopKeeper({
      id: randomUUID(),
      name: new Username(name),
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
    })
  }

  static withContractAndSignature({
    name,
    cpf,
    password,
    email,
    rg,
    contract,
    signature,
  }: IWithCredentialsAndContractSignatureInputProps) {
    return new ShopKeeper({
      id: randomUUID(),
      name: new Username(name),
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
      contract: new Contract(contract),
      signature: new Signature(signature.plan, signature.startDate),
    })
  }

  static withSignature({
    name,
    cpf,
    password,
    email,
    rg,
    signature,
  }: IWithCredentialsAndSignatureInputProps): ShopKeeper {
    return new ShopKeeper({
      id: randomUUID(),
      name: new Username(name),
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
      signature: new Signature(signature.plan, signature.startDate),
    })
  }

  static withContract({
    name,
    cpf,
    password,
    email,
    rg,
    contract,
  }: IWithCredentialsAndContractInputProps): ShopKeeper {
    return new ShopKeeper({
      id: randomUUID(),
      name: new Username(name),
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
      contract: new Contract(contract),
    })
  }
}
