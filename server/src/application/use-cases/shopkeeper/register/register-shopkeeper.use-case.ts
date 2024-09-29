import ConflictError from 'domain/base/errors/conflict-error'
import ShopKeeperFactory from '../../../../domain/entities/user/factories/shoop-keeper.facotry'
import IShopKeeperRepository from '../../../../domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperWithContractInputProps from './dto/input.interface'
import EncryptContract from 'application/contracts/encrypt.interface'
export default class RegisterShopKeeperWithContractUseCase {
  constructor(
    private readonly shopKeeperRepo: IShopKeeperRepository,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperWithContractInputProps) {

    const email = this.shopKeeperRepo.emailAlreadyExists(dto.email)

    if (email) {
      throw new ConflictError('E-mail already exists')
    }

    const hashedPassword = await this.encryptContract.hash(dto.password);
    dto.password = hashedPassword

    const shopKeeper = ShopKeeperFactory.withContract(dto);

    await this.shopKeeperRepo.create(shopKeeper)
    return ShopKeeperMapper.toOutput(shopKeeper)
  }
}
