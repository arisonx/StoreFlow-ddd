import { BaseDomainEntity } from '../@shared/entities/base-domain-entity'
import CPF from './value_objects/cpf'
import Email from './value_objects/email'
import { Password } from './value_objects/password'
import RG from './value_objects/rg'
import Name from './value_objects/username'

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
    return this._email.value
  }

  get password() {
    return this._password.value
  }

  get cpf() {
    return this._cpf.value
  }

  get rg() {
    return this._rg.value
  }

  get name() {
    return this._name.value
  }
}
