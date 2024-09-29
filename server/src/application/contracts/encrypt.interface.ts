export default abstract class EncryptContract {
  abstract hash(value: string, salt?: number): Promise<string>
  abstract compare(from: string, to: string): Promise<boolean>
}
