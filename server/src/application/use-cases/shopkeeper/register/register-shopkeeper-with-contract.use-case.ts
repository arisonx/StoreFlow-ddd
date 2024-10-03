import EncryptContract from 'application/contracts/encrypt.interface'
import ShopKeeperFactory from '../../../../domain/entities/user/factories/shoop-keeper.facotry'
import IShopKeeperRepository from '../../../../domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperWithContractInputProps from './dto/input.interface'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'
export default class RegisterShopKeeperWithContractUseCase {
  constructor(
    private readonly shopKeeperRepo: IShopKeeperRepository,
    private readonly registerShopKeeperCase: RegisterShopKeeperUseCase,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperWithContractInputProps) {
    await this.registerShopKeeperCase.execute({
      cpf: dto.cpf,
      email: dto.email,
    })

    dto.password = await this.encryptContract.hash(dto.password)

    const shopKeeper = ShopKeeperFactory.withContract(dto)

    await this.shopKeeperRepo.create(shopKeeper)
    return ShopKeeperMapper.toOutputWithContract(shopKeeper)
  }
}
