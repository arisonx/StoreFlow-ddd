import EncryptContract from '@application/contracts/encrypt.interface'
import ShopKeeperFactory from '@domain/entities/user/@shared/factories/shop-keeper.factory'
import IShopKeeperRepository from '@domain/repositories/shopkeeper-repository.abstract'
import { ShopKeeperMapper } from '../../../../domain/entities/user/@shared/mapper/shop-keeper.mapper'
import IRegisterShopKeeperWithSignatureInputProps from './dto/with-signature-input.interface'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'
import { SignatureShopKeeperService } from '@domain/entities/user/shopkeeper/signature/services/signature-shop-keeper.service'
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

    SignatureShopKeeperService.signaturePeriod(ShopKeeper)

    await this.ShopKeeperRepo.create(ShopKeeper)

    return ShopKeeperMapper.toOutputWithSignature(ShopKeeper)
  }
}
