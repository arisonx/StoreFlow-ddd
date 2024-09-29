import BaseDomainEntity from '../../base/entities/base-domain-entity'

export interface ICartProducts {
  id: string
  cartId: string
  productId: string
  qtd: number
  total: number
}

export class CartProduct extends BaseDomainEntity {
  private _cart_id: string
  private _product_id: string
  private _qtd: number
  private _total: number

  constructor({ id, cartId, productId, qtd, total }: ICartProducts) {
    super(id)
    this._cart_id = cartId
    this._product_id = productId
    this._qtd = qtd
    this._total = total
  }

  get total() {
    return this._total
  }

  get qtd() {
    return this._qtd
  }

  get cartId() {
    return this._cart_id
  }

  get productId() {
    return this._product_id
  }
}
