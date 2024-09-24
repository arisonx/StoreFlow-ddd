interface IAdress {
  street: string
  number: number
  zip: string
  city: string
}

export default class Adress {
  _street: string = ''
  _number: number = 0
  _zip: string = ''
  _city: string = ''

  constructor({ city, number, street, zip }: IAdress) {
    this._street = street
    this._number = number
    this._zip = zip
    this._city = city
    this.validate()
  }

  validate() {}
}
