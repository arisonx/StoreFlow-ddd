import Adress from '@domain/base/entities/adress'
import { BaseDomainEntity } from '@domain/base/entities/base-domain-entity'
import CNPJ from './cpnj'

export default class Store extends BaseDomainEntity {
  _name: string
  _cnpj: CNPJ
  _adress: Adress

  get cpnj() {
    return this._cnpj
  }

  get name() {
    return this._name
  }

  get adress() {
    return this._adress
  }
}
