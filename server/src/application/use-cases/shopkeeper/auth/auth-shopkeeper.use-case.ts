import EncryptContract from 'application/contracts/encrypt.interface'
import IShopKeeperRepository from 'domain/repositories/shopkeeper-repository.abstract'
import { IAuthShopKeeperInputDto } from './dto/input.dto'
import UnauthorizedError from 'domain/base/errors/unauthorized-error'
import CommonUseCase from 'application/@shared/base.use-case'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import { IAuthShopKeeperOutputDto } from './dto/output.dto'
export class AuthShopKeeperUseCase extends CommonUseCase {
  constructor(
    private readonly shopKeeperRepo: IShopKeeperRepository,
    private readonly encryptContract: EncryptContract,
  ) {
    super()
  }
  async execute({
    email,
    password,
  }: IAuthShopKeeperInputDto): Promise<IAuthShopKeeperOutputDto> {
    const shopKeeper = await this.shopKeeperRepo.findByEmail(email)

    if (!shopKeeper) {
      throw new UnauthorizedError('Invalid Email or Password')
    }

    const isValidPassword = await this.encryptContract.compare(
      password,
      shopKeeper.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid Email or Password')
    }

    if (shopKeeper.contract?.expired) {
      throw new UnauthorizedError('Contract Expired')
    }

    if (shopKeeper.signature?.expired) {
      throw new UnauthorizedError('Signature Expired')
    }

    this.notification.issue()

    return ShopKeeperMapper.toOutput(shopKeeper)
  }
}
