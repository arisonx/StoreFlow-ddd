import Cart from './cart.entity'
import { CartProduct } from '../cart_products/cart-products.entity'
import { randomUUID } from 'crypto'
describe('Cart unit tests', () => {
  let cartProduct: CartProduct

  let cart: Cart

  beforeAll(() => {
    cartProduct = new CartProduct({
      id: randomUUID(),
      cartId: '123',
      productId: '12345',
      qtd: 2,
      total: 200,
    })

    cart = new Cart({
      id: randomUUID(),
      userId: randomUUID(),
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
