export default class Email {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }

  get value() {
    return this._value;
  }

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._value)) {
      throw new Error("Invalid email format");
    }
  }
}
