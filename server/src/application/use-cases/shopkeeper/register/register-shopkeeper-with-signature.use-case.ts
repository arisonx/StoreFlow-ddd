import EncryptContract from '@application/contracts/encrypt.interface'
import ShopKeeperInitialFactory from '@domain/entities/user/factories/shoop-keeper.factory'

import IShopKeeperInitialRepository from '@domain/repositories/shopkeeper-repository.abstract'
import { ShoopKeeperService } from '@domain/services/shoop-keeper.service'
import { ShopKeeperInitialMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperInitialWithSignatureInputProps from './dto/with-signature-input.interface'
import { RegisterShopKeeperInitialUseCase } from './register-shopkeeper.use-case'

export class RegisterShopKeeperInitialWithSignatureUseCase {
  constructor(
    private readonly ShopKeeperInitialRepo: IShopKeeperInitialRepository,
    private readonly registerShopKeeperInitialCase: RegisterShopKeeperInitialUseCase,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperInitialWithSignatureInputProps) {
    await this.registerShopKeeperInitialCase.execute({
      cpf: dto.cpf,
      email: dto.email,
    })

    dto.password = await this.encryptContract.hash(dto.password)

    const ShopKeeper = ShopKeeperInitialFactory.withSignature(dto)

    ShoopKeeperService.signaturePeriod(ShopKeeper)

    await this.ShopKeeperInitialRepo.create(ShopKeeper)
    return ShopKeeperInitialMapper.toOutputWithSignature(ShopKeeper)
  }
}
