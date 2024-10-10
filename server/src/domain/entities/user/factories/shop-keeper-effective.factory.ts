import { randomUUID } from 'node:crypto'
import { Contract } from '../contract'
import CPF from '../cpf'
import Email from '../email'
import { Password } from '../password'
import RG from '../rg'
import ShopKeeperEffective from '../shop-keeper-effective.entity'
import Signature, { SignaturePlanEnum } from '../signature'
import Username from '../username'

export interface CommonShopKeeperFactoryInputProps {
  name: string
  cpf: string
  password: string
  email: string
  rg: string
  signature: {
    plan: SignaturePlanEnum
    startDate: Date
  }
  contract: {
    startDate: Date
    endDate: Date
    value: number
  }
}

export type IWithAllCredentialsInputProps = CommonShopKeeperFactoryInputProps

export default class ShopKeeperEffectiveFactory {
  static withAllCredentials({
    name,
    cpf,
    password,
    email,
    rg,
    contract,
    signature,
  }: IWithAllCredentialsInputProps) {
    return new ShopKeeperEffective({
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
}
