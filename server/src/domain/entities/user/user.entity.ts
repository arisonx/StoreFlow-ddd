import BaseDomainEntity from '@domain/base/entities/base-domain-entity'
import CPF from './cpf'
import Email from './email'
import { Password } from './password'
import RG from './rg'
import Name from './username'

export interface IUserCreationProps {
  id: string
  name: Name
  rg: RG
  cpf: CPF
  email: Email
  password: Password
}

export default class User extends BaseDomainEntity {
  private _name: Name
  private _rg: RG
  private _cpf: CPF
  private _email: Email
  private _password: Password

  constructor({ id, name, email, cpf, rg, password }: IUserCreationProps) {
    super(id)
    this._name = name
    this._email = email
    this._cpf = cpf
    this._rg = rg
    this._password = password
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get cpf() {
    return this._cpf
  }

  get rg() {
    return this._rg
  }

  get name() {
    return this._name.value
  }
}
