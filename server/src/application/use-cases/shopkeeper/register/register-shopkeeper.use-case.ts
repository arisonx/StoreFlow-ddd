import ConflictError from 'domain/base/errors/conflict-error'
import ShopKeeperFactory from '../../../../domain/entities/user/factories/shoop-keeper.facotry'
import IShopKeeperRepository from '../../../../domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperWithContractInputProps from './dto/input.interface'
import EncryptContract from 'application/contracts/encrypt.interface'
import CommonUseCase from 'application/@shared/base.use-case'
export default class RegisterShopKeeperWithContractUseCase extends CommonUseCase {
  constructor(
    private readonly shopKeeperRepo: IShopKeeperRepository,
    private readonly encryptContract: EncryptContract,
  ) {
    super()
  }

  async execute(dto: IRegisterShopKeeperWithContractInputProps) {
    const promises = [
      this.shopKeeperRepo.emailAlreadyExists(dto.email),
      this.shopKeeperRepo.cpfAlreadyExists(dto.cpf),
    ]

    const [email, cpf] = await Promise.all(promises)

    if (email) {
      this.notification.add({
        context: 'ShopKeeper Register',
        error: new ConflictError('E-mail already exists'),
      })
    }

    if (cpf) {
      this.notification.add({
        context: 'ShopKeeper Register',
        error: new ConflictError('CPF already exists'),
      })
    }

    this.notification.issue()

    const hashedPassword = await this.encryptContract.hash(dto.password)
    dto.password = hashedPassword

    const shopKeeper = ShopKeeperFactory.withContract(dto)

    await this.shopKeeperRepo.create(shopKeeper)
    return ShopKeeperMapper.toOutput(shopKeeper)
  }
}
