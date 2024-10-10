import { IUserCreationProps } from '../../user.entity'
import ShopKeeper from '../shop-keeper.entity'
import Signature from './signature'
export default class SignatureShopKeeper extends ShopKeeper {
  private _signature: Signature

  constructor(
    props: IUserCreationProps & {
      signature: Signature
    },
  ) {
    super(props)
    this._signature = props.signature
    this.validate()
  }

  private validate() {
    if (!this._signature) {
      throw new Error('Signature is Required')
    }
  }

  get signature() {
    return this._signature
  }
}
