import BaseDomainEntity from '../../base/entities/base-domain-entity'

export interface IProduct {
  id: string
  name: string
  storeId: string
  price: number
}

export default class Product extends BaseDomainEntity {
  private _name: string
  private _price: number
  private _storeId: string

  constructor({ id, name, price, storeId }: IProduct) {
    super(id)
    this._name = name
    this._price = price
    this._storeId = storeId
    this.validate()
  }

  changeName(name: string): void {
    this._name = name
    this.validate()
  }

  changePrice(price: number): void {
    this._price = price
    this.validate()
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is Required')
    }

    if (this._price <= 0) {
      throw new Error('Price is Required')
    }
  }

  get storeId() {
    return this._storeId
  }

  get price() {
    return this._price
  }

  get name() {
    return this._name
  }
}
