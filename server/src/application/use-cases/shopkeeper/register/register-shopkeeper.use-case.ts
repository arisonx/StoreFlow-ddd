import CommonUseCase from '@application/@shared/base.use-case'
import ConflictError from '@domain/base/errors/conflict-error'
import IShopKeeperInitialRepository from '@domain/repositories/shopkeeper-repository.abstract'

export interface IRegisterShopKeeperInitialInputDto {
  email: string
  cpf: string
}
export class RegisterShopKeeperInitialUseCase extends CommonUseCase {
  constructor(
    private readonly ShopKeeperInitialRepo: IShopKeeperInitialRepository,
  ) {
    super()
  }

  async execute(dto: IRegisterShopKeeperInitialInputDto) {
    const promises = [
      this.ShopKeeperInitialRepo.emailAlreadyExists(dto.email),
      this.ShopKeeperInitialRepo.cpfAlreadyExists(dto.cpf),
    ]

    const [email, cpf] = await Promise.all(promises)

    if (email) {
      this.notification.add({
        context: 'ShopKeeperInitial Register',
        error: new ConflictError('E-mail already exists'),
      })
    }

    if (cpf) {
      this.notification.add({
        context: 'ShopKeeperInitial Register',
        error: new ConflictError('CPF already exists'),
      })
    }

    this.notification.issue()
  }
}
