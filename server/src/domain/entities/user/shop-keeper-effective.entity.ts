import Store from '../store/store.entity'
import { Contract } from './contract'
import Signature from './signature'
import User, { IUserCreationProps } from './user.entity'

interface IShopKeeperEffectiveCreationProps extends IUserCreationProps {
  signature: Signature
  contract: Contract
}

export default class ShopKeeperEffective extends User {
  private _store: Store
  private _signature: Signature
  private _contract: Contract

  constructor(props: IShopKeeperEffectiveCreationProps) {
    super(props)
    this._signature = props.signature
    this._contract = props.contract
    this.validate()
  }

  private validate() {
    if (!this._signature || !this._contract) {
      throw new Error('Signature and Contract is Required')
    }
  }

  get signature() {
    return this._signature
  }

  get contract() {
    return this._contract
  }

  get store() {
    return this._store
  }
}
