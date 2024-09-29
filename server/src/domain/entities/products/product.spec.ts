import Product from './product.entity'
import { randomUUID } from 'crypto'
describe('Product unit tests', () => {
  it('Should throw error when name is empty', () => {
    expect(() => {
      new Product({
        name: '',
        id: randomUUID(),
        price: 100,
        storeId: randomUUID(),
      })
    }).toThrow('Name is Required')
  })

  it('Should throw error when name is empty', () => {
    expect(() => {
      new Product({
        name: '',
        price: 100,
        id: randomUUID(),
        storeId: randomUUID(),
      })
    }).toThrow('Name is Required')
  })

  it('Should throw error when price is invalid', () => {
    expect(() => {
      new Product({
        name: 'Shampoo',
        price: 0,
        id: randomUUID(),
        storeId: randomUUID(),
      })
    }).toThrow('Price is Required')
  })

  it('Should change name', () => {
    const product = new Product({
      name: 'Shampoo',
      id: randomUUID(),
      price: 200,
      storeId: randomUUID(),
    })
    product.changeName('Shampoo 2')
    expect(product.name).toBe('Shampoo 2')
  })

  it('Should change price', () => {
    const product = new Product({
      id: randomUUID(),
      name: 'Shampoo',
      price: 200,
      storeId: randomUUID(),
    })
    product.changePrice(200)
    expect(product.price).toBe(200)
  })
})
