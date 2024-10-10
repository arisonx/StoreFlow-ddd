import Adress from '@domain/@shared/value_objects/adress'
import { BaseDomainEntity } from '@domain/@shared/entities/base-domain-entity'
import CNPJ from './value_objects/cpnj'

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
