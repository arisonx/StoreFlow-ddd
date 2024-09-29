import { randomUUID } from 'node:crypto'
import BaseDomainEntity from './base-domain-entity'
describe('Base Domain Entity unit tests', () => {
  it('Should throw a error if id is empty', () => {
    expect(() => {
      new BaseDomainEntity('')
    }).toThrow('Id is Required')
  })

  it('Should create a base entity', () => {
    const id = randomUUID()
    const entity = new BaseDomainEntity(id)
    expect(entity.id).toBe(id)
  })
})
