import User, { IUserCreationProps } from './user.entity'

export type IStoreClient = IUserCreationProps

export class StoreClient extends User {
  constructor(props: IStoreClient) {
    super(props)
  }
}
