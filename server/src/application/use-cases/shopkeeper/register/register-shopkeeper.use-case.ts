import CommonUseCase from '@application/@shared/base.use-case'
import ConflictError from '@domain/base/errors/conflict-error'
import IShopKeeperRepository from '@domain/repositories/shopkeeper-repository.abstract'
export interface IRegisterShopKeeperInputDto {
  email: string
  cpf: string
}
export class RegisterShopKeeperUseCase extends CommonUseCase {
  constructor(private readonly ShopKeeperRepo: IShopKeeperRepository) {
    super()
  }

  async execute(dto: IRegisterShopKeeperInputDto) {
    const promises = [
      this.ShopKeeperRepo.emailAlreadyExists(dto.email),
      this.ShopKeeperRepo.cpfAlreadyExists(dto.cpf),
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
  }
}
