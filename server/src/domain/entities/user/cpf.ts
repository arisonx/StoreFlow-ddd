import { cpf } from "cpf-cnpj-validator";

export default class CPF {
  _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }

  validate() {
    if (!cpf.isValid(this._value)) {
      throw new Error("Invalid CPF");
    }
  }

  get value() {
    return this._value;
  }
}
