export class Password {
  private _value: string

  constructor(value: string) {
    this._value = value
    this.validate()
  }

  private validate() {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this._value)
    const hasNumber = /\d/.test(this._value)
    const isLongEnough = this._value.length >= 8

    if (!hasSpecialChar) {
      throw new Error('Password must contain at least one special character.')
    }

    if (!hasNumber) {
      throw new Error('Password must contain at least one number.')
    }

    if (!isLongEnough) {
      throw new Error('Password must be at least 8 characters long.')
    }
  }

  get value() {
    return this._value
  }
}
