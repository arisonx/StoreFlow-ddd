import User, { IUserCreationProps } from './user.entity'

interface IStoreClient extends IUserCreationProps {}

export class StoreClient extends User {
  constructor(props: IStoreClient) {
    super(props)
  }
}
