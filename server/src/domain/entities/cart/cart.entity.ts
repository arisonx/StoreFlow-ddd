import { BaseDomainEntity } from '@domain/base/entities/base-domain-entity'
import { CartProduct } from '../cart_products/cart-products.entity'

export interface ICart {
  id: string
  userId: string
}

export default class Cart extends BaseDomainEntity {
  private _userId: string
  private _products: CartProduct[] = []

  constructor({ id, userId }: ICart) {
    super(id)
    this._userId = userId
    this.validate()
  }

  validate() {
    if (this._userId.length === 0) {
      throw new Error('UserId is Required')
    }
  }

  clear() {
    this._products = []
  }

  remove(cartProductId: string): void {
    this._products = this._products.filter(
      (cartProduct) => cartProduct.id !== cartProductId,
    )
  }

  add(cartProduct: CartProduct) {
    this._products.push(cartProduct)
  }

  get total() {
    return this._products.reduce((acc, item) => item.total + acc, 0)
  }

  get products() {
    return this._products
  }
}
