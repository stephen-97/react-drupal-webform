import { TWebformValueFormat } from '@/lib/types/form'

const defaultValueFormatObj: Required<TWebformValueFormat> = {
  radio: 'booleanMap',
  select: 'booleanMap',
  checkboxes: 'booleanMap',
}

export { defaultValueFormatObj }
