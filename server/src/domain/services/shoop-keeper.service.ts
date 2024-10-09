import ShopKeeper from '@domain/entities/user/shoop-keeper.entity'
import { SignaturePlanEnum } from '@domain/entities/user/signature'
import { monthInserter } from '@utils/month-inserter'

export class ShoopKeeperService {
  public static signaturePeriod(shoopKeeper: ShopKeeper) {
    if (!shoopKeeper.signature) return null

    const { plan, startDate } = shoopKeeper.signature

    const signaturePeriodLiterals = {
      [SignaturePlanEnum.STARTER]: monthInserter(startDate, 1),
      [SignaturePlanEnum.BASIC]: monthInserter(startDate, 6),
      [SignaturePlanEnum.PREMIUM]: monthInserter(startDate, 12),
    }
    const endDate = signaturePeriodLiterals[plan]

    shoopKeeper.signature.insertEndDate(endDate)
  }
}
