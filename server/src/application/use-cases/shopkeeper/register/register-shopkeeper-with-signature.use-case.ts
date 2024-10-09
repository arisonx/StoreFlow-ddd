import EncryptContract from '@application/contracts/encrypt.interface'
import ShopKeeperFactory from '@domain/entities/user/factories/shop-keeper.factory'
import IShopKeeperRepository from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperService } from '@domain/services/shop-keeper.service'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
import IRegisterShopKeeperWithSignatureInputProps from './dto/with-signature-input.interface'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'

export class RegisterShopKeeperWithSignatureUseCase {
  constructor(
    private readonly ShopKeeperRepo: IShopKeeperRepository,
    private readonly registerShopKeeperCase: RegisterShopKeeperUseCase,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperWithSignatureInputProps) {
    await this.registerShopKeeperCase.execute({
      cpf: dto.cpf,
      email: dto.email,
    })

    dto.password = await this.encryptContract.hash(dto.password)

    const ShopKeeper = ShopKeeperFactory.withSignature(dto)

    ShopKeeperService.signaturePeriod(ShopKeeper)

    await this.ShopKeeperRepo.create(ShopKeeper)
    return ShopKeeperMapper.toOutputWithSignature(ShopKeeper)
  }
}
