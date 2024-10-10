import EncryptContract from '@application/contracts/encrypt.interface'
import ShopKeeperFactory from '@domain/user/@shared/factories/shop-keeper.factory'
import IShopKeeperRepository from '@domain/user/shopkeeper/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../../../../domain/user/@shared/mapper/shop-keeper.mapper'
import IRegisterShopKeeperWithContractInputProps from './dto/input.interface'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'

export default class RegisterShopKeeperWithContractUseCase {
  constructor(
    private readonly ShopKeeperRepo: IShopKeeperRepository,
    private readonly registerShopKeeperCase: RegisterShopKeeperUseCase,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperWithContractInputProps) {
    await this.registerShopKeeperCase.execute({
      cpf: dto.cpf,
      email: dto.email,
    })

    dto.password = await this.encryptContract.hash(dto.password)

    const ShopKeeper = ShopKeeperFactory.withContract(dto)

    await this.ShopKeeperRepo.create(ShopKeeper)
    return ShopKeeperMapper.toOutputWithContract(ShopKeeper)
  }
}
