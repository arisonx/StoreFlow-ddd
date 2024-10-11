export enum SignaturePlanEnum {
  STARTER = 'Starter',
  BASIC = 'Basic',
  PREMIUM = 'Premium',
}

export default class Signature {
  private _endDate: Date
  private _startDate: Date
  private _plan: SignaturePlanEnum
  private _value: number

  constructor(plan: SignaturePlanEnum, startDate: Date) {
    this._startDate = startDate
    this._plan = plan
    this.validate()
  }

  private validate() {
    if (!this._plan) {
      throw new Error('Plan Is Required')
    }
  }

  insertEndDate(date: Date) {
    this._endDate = date
  }

  insertValue(value: number) {
    this._value = value
  }

  get endDate() {
    return this._endDate
  }

  get expired() {
    if (!this._endDate) {
      return true
    }
    const currentDate = new Date()
    return currentDate > this._endDate
  }

  get startDate() {
    return this._startDate
  }

  get plan() {
    return this._plan
  }

  get value() {
    return this._value
  }
}
