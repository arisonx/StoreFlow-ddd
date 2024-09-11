export default class CNPJ {
  _value: string

  constructor(cnpj: string) {
    this._value = cnpj
    this.validate()
  }

  validate() {}

  get value() {
    return this._value
  }
}
