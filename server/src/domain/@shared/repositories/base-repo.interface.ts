export interface IResourceListOutputProps<T> {
  items: (T | undefined)[]
  meta: {
    totalPages: number
    registersInPage: number
    currentPage: number
  }
}
export interface IResourceListInputProps {
  limit?: number
  offset?: number
  all?: boolean
}
export default interface IRepository<T, O extends IResourceListInputProps> {
  findOne(id: string): Promise<T | undefined>
  create(entity: T): Promise<void>
  findAll(options: O): Promise<IResourceListOutputProps<T>>
  delete(id: string): Promise<void>
  update(id: string): Promise<void>
  count(): Promise<number>
}
