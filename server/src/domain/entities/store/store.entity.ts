import Adress from '../../base/entities/adress'
import BaseDomainEntity from '../../base/entities/base-domain-entity'
import CNPJ from './cpnj'

export default class Store extends BaseDomainEntity {
  _name: string
  _cnpj: CNPJ
  _adress: Adress
}
