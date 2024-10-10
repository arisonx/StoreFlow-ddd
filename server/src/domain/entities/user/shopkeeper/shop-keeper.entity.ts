import Store from '../../store/store.entity'
import User, { IUserCreationProps } from '../user.entity'
export default abstract class ShopKeeper extends User {
  private _store: Store

  constructor(props: IUserCreationProps) {
    super(props)
  }

  get store() {
    return this._store
  }
}
