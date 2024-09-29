import { Notification } from "domain/notification"

export default abstract class CommonUseCase {
  private _notification = new Notification()

  get notification() {
    return this._notification
  }
}
