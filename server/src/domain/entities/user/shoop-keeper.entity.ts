import Store from '../store/store.entity'
import Signature from './signature'
import User, { IUserCreationProps } from './user.entity'
interface IShoopKeeperCreationProps extends IUserCreationProps {
  store: Store
  signature: Signature
}

export default class ShopKeeper extends User {
  private _store: Store
  private _signature: Signature

  constructor(props: IShoopKeeperCreationProps) {
    super(props)
    this._signature = props.signature
    this._store = props.store
    this.validate()
  }

  private validate() {
    if (!this._store) {
      throw new Error('Store is Required')
    }

    if (!this._signature) {
      throw new Error('Signature is Required')
    }
  }

  get signature() {
    return this._signature
  }

  get store() {
    return this._store
  }
}
