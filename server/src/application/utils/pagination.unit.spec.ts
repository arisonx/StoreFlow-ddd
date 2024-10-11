import { Pagination } from './pagination'
describe('Pagination Unit Tests', () => {
  it("Should return the correct pagination object when 'all' is false", () => {
    const result = Pagination({ take: 20, skip: 3 })
    expect(result).toEqual({
      take: 20,
      skip: 40,
    })
  })

  it("Should return default pagination values when 'all' is false and no arguments are provided", () => {
    const result = Pagination({})
    expect(result).toEqual({
      take: 35,
      skip: 0,
    })
  })

  it("Should return undefined when 'all' is true", () => {
    const result = Pagination({ all: true })
    expect(result).toBeUndefined()
  })

  it('Should return correct skip when page is 1', () => {
    const result = Pagination({ take: 10, skip: 1 })
    expect(result).toEqual({
      take: 10,
      skip: 0,
    })
  })

  it('Should calculate skip correctly for pages greater than 1', () => {
    const result = Pagination({ take: 15, skip: 4 })
    expect(result).toEqual({
      take: 15,
      skip: 45,
    })
  })
})
