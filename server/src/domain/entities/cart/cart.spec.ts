import { v4 } from 'uuid'
import Product from '../products/product.entity'
import Cart from './cart.entity'
import { CartProduct } from '../cart_products/cart-products.entity'
import { randomUUID } from 'crypto'
import { describe, it, expect, beforeAll } from 'vitest'

describe('Cart unit tests', () => {
  let product1: Product
  let cartProduct: CartProduct
  let product2: Product
  let cart: Cart

  beforeAll(() => {
    cartProduct = new CartProduct({
      id: randomUUID(),
      cartId: '123',
      productId: '12345',
      qtd: 2,
      total: 200,
    })

    product1 = new Product({
      id: randomUUID(),
      name: 'Shampoo',
      price: 200,
      storeId: v4(),
    })
    product2 = new Product({
      id: randomUUID(),
      name: 'Sabonete',
      price: 250,
      storeId: v4(),
    })
    cart = new Cart({
      id: randomUUID(),
      userId: v4(),
    })
  })

  it('Should throw a error if userId is empty', () => {
    expect(() => {
      new Cart({
        id: randomUUID(),
        userId: '',
      })
    }).toThrow('UserId is Required')
  })

  it('Should add a product to cart', () => {
    cart.add(cartProduct)

    expect(cart.products.length).toBe(1)
  })

  it('Should clear cart', () => {
    cart.add(cartProduct)

    cart.clear()

    expect(cart.products).toHaveLength(0)
  })

  it('Should remove a product from the cart', () => {
    cart.remove(cartProduct.productId)

    expect(cart.products.length).toBe(0)
  })

  it('Should must calculate the cart total', () => {
    cart.add(cartProduct)

    cart.add(cartProduct)

    expect(cart.total).toBe(400)
  })
})
