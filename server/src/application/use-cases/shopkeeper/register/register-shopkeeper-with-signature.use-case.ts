import CommonUseCase from 'application/@shared/base.use-case'
import IShopKeeperRepository from 'domain/repositories/shopkeeper-repository.abstract'
import { ShoopKeeperService } from 'domain/services/shoop-keeper.service'
import { RegisterShopKeeperUseCase } from './register-shopkeeper.use-case'
import EncryptContract from 'application/contracts/encrypt.interface'
import ShopKeeperFactory from 'domain/entities/user/factories/shoop-keeper.facotry'
import IRegisterShopKeeperWithSignatureInputProps from './dto/with-signature-input.interface'
import { ShopKeeperMapper } from '../shop-keeper.mapper'
export class RegisterShopKeeperWithSignatureUseCase {
  constructor(
    private readonly shopKeeperRepo: IShopKeeperRepository,
    private readonly registerShopKeeperCase: RegisterShopKeeperUseCase,
    private readonly encryptContract: EncryptContract,
  ) {}

  async execute(dto: IRegisterShopKeeperWithSignatureInputProps) {
    await this.registerShopKeeperCase.execute({
      cpf: dto.cpf,
      email: dto.email,
    })

    dto.password = await this.encryptContract.hash(dto.password)

    const shopKeeper = ShopKeeperFactory.withSignature(dto)

    ShoopKeeperService.signaturePeriod(shopKeeper)

    await this.shopKeeperRepo.create(shopKeeper)
    return ShopKeeperMapper.toOutputWithSignature(shopKeeper)
  }
}
