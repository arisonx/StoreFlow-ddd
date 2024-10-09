import CommonUseCase from '@application/@shared/base.use-case'
import EncryptContract from '@application/contracts/encrypt.interface'
import UnauthorizedError from '@domain/base/errors/unauthorized-error'
import IShopKeeperRepository from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import { IAuthShopKeeperInputDto } from './dto/input.dto'
import { IAuthShopKeeperOutputDto } from './dto/output.dto'
export class AuthShopKeeperUseCase extends CommonUseCase {
  constructor(
    private readonly ShopKeeperRepo: IShopKeeperRepository,
    private readonly encryptContract: EncryptContract,
  ) {
    super()
  }
  async execute({
    email,
    password,
  }: IAuthShopKeeperInputDto): Promise<IAuthShopKeeperOutputDto> {
    const ShopKeeper = await this.ShopKeeperRepo.findByEmail(email)

    if (!ShopKeeper) {
      throw new UnauthorizedError('Invalid Email or Password')
    }

    const isValidPassword = await this.encryptContract.compare(
      password,
      ShopKeeper.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid Email or Password')
    }

    if (ShopKeeper.contract?.expired) {
      throw new UnauthorizedError('Contract Expired')
    }

    if (ShopKeeper.signature?.expired) {
      throw new UnauthorizedError('Signature Expired')
    }

    this.notification.issue()

    return ShopKeeperMapper.toOutput(ShopKeeper)
  }
}
