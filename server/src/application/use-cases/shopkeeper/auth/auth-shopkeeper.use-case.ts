import CommonUseCase from '@application/@shared/base.use-case'
import EncryptContract from '@application/contracts/encrypt.interface'
import UnauthorizedError from '@domain/@shared/errors/unauthorized-error'
import IShopKeeperRepository from '@domain/user/shopkeeper/repositories/shopkeeper-repository.abstract'
import { IAuthShopKeeperInputDto } from './dto/input.dto'
import { IAuthShopKeeperOutputDto } from './dto/output.dto'
import ContractShopKeeper from '@domain/user/shopkeeper/contract/contract-shop-keeper.entity'
import SignatureShopKeeper from '@domain/user/shopkeeper/signature/signature-shop-keeper.entity'
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
    const shopKeeper = await this.ShopKeeperRepo.findByEmail(email)

    const signatureShopKeeper = shopKeeper instanceof SignatureShopKeeper

    const contractShopKeeper = shopKeeper instanceof ContractShopKeeper

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

    if (contractShopKeeper && shopKeeper.contract.expired) {
      throw new UnauthorizedError('Contract Expired')
    }

    if (signatureShopKeeper && shopKeeper.signature.expired) {
      throw new UnauthorizedError('Signature Expired')
    }

    this.notification.issue()

    return {
      name: shopKeeper.name,
      email: shopKeeper.email,
    }
  }
}
