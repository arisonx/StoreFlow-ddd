import { randomUUID } from 'crypto'
import ShopKeeper from '../shoop-keeper.entity'
import Username from '../username'
import CPF from '../cpf'
import { Password } from '../password'
import Email from '../email'
import RG from '../rg'
import { Contract } from '../contract'
import Signature, { SignaturePlanEnum } from '../signature'

interface CommonShopKeeperFactoryInputProps {
  name: string
  cpf: string
  password: string
  email: string
  rg: string
}

interface IWithCredentialsInputProps
  extends CommonShopKeeperFactoryInputProps {}

interface IWithCredentialsAndSignatureInputProps
  extends CommonShopKeeperFactoryInputProps {
  signature: {
    plan: SignaturePlanEnum
    startDate: Date
  }
}

interface IWithCredentialsAndContractInputProps
  extends CommonShopKeeperFactoryInputProps {
  contract: {
    startDate: Date
    endDate: Date
    value: number
  }
}

interface IWithCredentialsAndContractSignatureInputProps
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
      contract: null,
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
      signature: null,
      cpf: new CPF(cpf),
      password: new Password(password),
      email: new Email(email),
      rg: new RG(rg),
      contract: new Contract(contract),
    })
  }
}
