import CommonUseCase from '@application/@shared/base.use-case'
import EncryptContract from '@application/contracts/encrypt.interface'
import UnauthorizedError from '@domain/base/errors/unauthorized-error'
import IShopKeeperInitialRepository from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperInitialMapper } from '../shop-keeper.mapper'
import { IAuthShopKeeperInitialInputDto } from './dto/input.dto'
import { IAuthShopKeeperInitialOutputDto } from './dto/output.dto'
export class AuthShopKeeperInitialUseCase extends CommonUseCase {
  constructor(
    private readonly ShopKeeperInitialRepo: IShopKeeperInitialRepository,
    private readonly encryptContract: EncryptContract,
  ) {
    super()
  }
  async execute({
    email,
    password,
  }: IAuthShopKeeperInitialInputDto): Promise<IAuthShopKeeperInitialOutputDto> {
    const ShopKeeper = await this.ShopKeeperInitialRepo.findByEmail(email)

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

    return ShopKeeperInitialMapper.toOutput(ShopKeeper)
  }
}
