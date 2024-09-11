export default class Usermame {
  private _value: string

  constructor(name: string) {
    this._value = name
    this.validate()
  }

  private validate() {
    if (/[^\w\s]/.test(this.value)) {
      throw new Error('The name must not contain special characters')
    }

    if (this._value.length < 1 || this._value.length > 255) {
      throw new Error('The name must have between 1 and 255 characters')
    }
  }

  get value(): string {
    return this._value
  }
}
