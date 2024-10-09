import EncryptContract from '@application/contracts/encrypt.interface'
import ShopKeeperInitialFactory from '@domain/entities/user/factories/shoop-keeper.factory'
import IShopKeeperInitialRepository from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperInitialMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperInitialWithContractInputProps from './dto/input.interface'
import { RegisterShopKeeperInitialUseCase } from './register-shopkeeper.use-case'

export default class RegisterShopKeeperInitialWithContractUseCase {
  constructor(
    private readonly ShopKeeperInitialRepo: IShopKeeperInitialRepository,
    private readonly registerShopKeeperInitialCase: RegisterShopKeeperInitialUseCase,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperInitialWithContractInputProps) {
    await this.registerShopKeeperInitialCase.execute({
      cpf: dto.cpf,
      email: dto.email,
    })

    dto.password = await this.encryptContract.hash(dto.password)

    const ShopKeeper = ShopKeeperInitialFactory.withContract(dto)

    await this.ShopKeeperInitialRepo.create(ShopKeeper)
    return ShopKeeperInitialMapper.toOutputWithContract(ShopKeeper)
  }
}
