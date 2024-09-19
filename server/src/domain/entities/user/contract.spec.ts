import { Contract, IContractConstructorProps } from "./contract"
describe('Contract unit tests', () => {
  it('Should throw error if startDate is invalid', () => {
    expect(() => {
      new Contract({
        startDate: new Date('invalid-date'),
        endDate: new Date('2024-12-01'),
        value: 2000,
      })
    }).toThrow('Start Date of Contract is invalid')
  })

  it('Should throw error if endDate is invalid', () => {
    expect(() => {
      new Contract({
        startDate: new Date('2024-09-01'),
        endDate: new Date('invalid-date'),
        value: 2000,
      })
    }).toThrow('End Date of Contract is invalid')
  })

  it('Should throw error if startDate is not before endDate', () => {
    expect(() => {
      new Contract({
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-09-01'),
        value: 2000,
      })
    }).toThrow('Start Date must be before End Date')
  })

  it('Should throw error if value is less than or equal to zero', () => {
    expect(() => {
      new Contract({
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-01'),
        value: 0,
      })
    }).toThrow('Value of Contract must be greater than zero')
    
    expect(() => {
      new Contract({
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-01'),
        value: -100,
      })
    }).toThrow('Value of Contract must be greater than zero')
  })

  it('Should throw error if contract period exceeds 10 years', () => {
    expect(() => {
      new Contract({
        startDate: new Date('2014-09-01'),
        endDate: new Date('2024-09-01'),
        value: 2000,
      })
    }).toThrow('Contract period cannot exceed 10 years')
  })

  it('Should create a valid Contract', () => {
    const contractProps: IContractConstructorProps = {
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-01'),
      value: 2000,
    }

    const contract = new Contract(contractProps)

    expect(contract.startDate).toEqual(contractProps.startDate)
    expect(contract.endDate).toEqual(contractProps.endDate)
    expect(contract.value).toEqual(contractProps.value)
  })
})
