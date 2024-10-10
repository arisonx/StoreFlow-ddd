import ShopKeeper from '../shop-keeper.entity'
import { IUserCreationProps } from '../../user.entity'
import { Contract } from './contract'
export default class ContractShopKeeper extends ShopKeeper {
  private _contract: Contract

  constructor(
    props: IUserCreationProps & {
      contract: Contract
    },
  ) {
    super(props)
    this._contract = props.contract
    this.validate()
  }

  private validate() {
    if (!this._contract) {
      throw new Error('Contract is Required')
    }
  }

  get contract() {
    return this._contract
  }
}
