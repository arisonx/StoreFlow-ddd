interface IPaginationInputProps {
  take?: number
  skip?: number
  all?: boolean
}

export const SkipCalculator = (limit: number, skip: number) =>
  (skip = skip > 1 ? (skip - 1) * limit : 0)
export function Pagination({
  take = 35,
  skip = 0,
  all,
}: IPaginationInputProps) {
  if (all) {
    return
  }
  return {
    take,
    skip: SkipCalculator(take, skip),
  }
}
