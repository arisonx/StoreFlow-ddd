export interface IContractConstructorProps {
  startDate: Date
  endDate: Date
  value: number
}

export class Contract {
  private _startDate: Date
  private _endDate: Date
  private _value: number

  constructor({ startDate, endDate, value }: IContractConstructorProps) {
    this._startDate = startDate
    this._endDate = endDate
    this._value = value

    this.validate()
  }

  validate() {
    if (
      !(this._startDate instanceof Date) ||
      isNaN(this._startDate.getTime())
    ) {
      throw new Error('Start Date of Contract is invalid')
    }

    if (!(this._endDate instanceof Date) || isNaN(this._endDate.getTime())) {
      throw new Error('End Date of Contract is invalid')
    }

    if (this._startDate >= this._endDate) {
      throw new Error('Start Date must be before End Date')
    }

    if (this._value <= 0) {
      throw new Error('Value of Contract must be greater than zero')
    }

    const maxContractPeriodInYears = 10
    const contractPeriodInYears =
      (this._endDate.getTime() - this._startDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365)
    if (contractPeriodInYears > maxContractPeriodInYears) {
      throw new Error(
        `Contract period cannot exceed ${maxContractPeriodInYears} years`,
      )
    }
  }

  get startDate() {
    return this._startDate
  }

  get expired() {
    if (!this._endDate) {
      return false
    }
    const currentDate = new Date()
    return currentDate > this._endDate
  }

  get endDate() {
    return this._endDate
  }

  get value() {
    return this._value
  }
}
