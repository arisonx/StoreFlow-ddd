export default class BaseDomainEntity {
  private _id: string
  private _createdAt: Date = new Date()
  private _updatedAt!: Date

  constructor(id: string) {
    this._id = id
    if (!this._id) {
      throw new Error('Id is Required')
    }
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  get id() {
    return this._id
  }
}
