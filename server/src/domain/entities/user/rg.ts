export default class RG {
  private _value: string

  constructor(value: string) {
    this._value = this.removeMask(value)
    this.validate()
  }

  private removeMask(value: string): string {
    return value.replace(/[^\d]/g, '')
  }

  private validate() {
    if (this._value.length < 9 || this._value.length > 11) {
      throw new Error('Invalid RG')
    }
  }

  get value(): string {
    return this._value
  }
}
