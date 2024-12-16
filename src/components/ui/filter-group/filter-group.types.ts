export type FilterItem = {
  id: string
  name: string
}

export type FilterGroupProps = {
  title: string
  items: FilterItem[]
  type?: 'checkbox' | 'radio'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  showSearch?: boolean
}
