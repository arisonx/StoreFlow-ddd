import ShopKeeper from '@domain/entities/user/shop-keeper.entity'
import { SignaturePlanEnum } from '@domain/entities/user/signature'
import { monthInserter } from '@utils/month-inserter'

export class ShopKeeperService {
  public static signaturePeriod(shopKeeper: ShopKeeper) {
    if (!shopKeeper.signature) return null

    const { plan, startDate } = shopKeeper.signature

    const signaturePeriodLiterals = {
      [SignaturePlanEnum.STARTER]: monthInserter(startDate, 1),
      [SignaturePlanEnum.BASIC]: monthInserter(startDate, 6),
      [SignaturePlanEnum.PREMIUM]: monthInserter(startDate, 12),
    }
    const endDate = signaturePeriodLiterals[plan]

    shopKeeper.signature.insertEndDate(endDate)
  }
}
