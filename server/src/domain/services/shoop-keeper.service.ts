import { monthInserter } from '../../utils/month-inserter'
import ShopKeeper from '../entities/user/shoop-keeper.entity'
import { SignaturePlanEnum } from '../entities/user/signature'

export class ShoopKeeperService {
  signaturePeriod(shoopKeeper: ShopKeeper) {
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
