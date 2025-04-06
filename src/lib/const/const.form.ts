import {
  TWebformDefaultFieldValues,
  TWebformValueFormat,
} from '@/lib/types/form'

const defaultValueFormatObj: Required<TWebformValueFormat> = {
  radio: 'booleanMap',
  select: 'booleanMap',
  checkboxes: 'booleanMap',
}

const defaultValuesObj: Required<TWebformDefaultFieldValues> = {
  textfield: '',
  textarea: '',
  email: '',
  radio: '',
  select: '',
  checkboxes: [],
  checkbox: false,
  number: '',
}
export { defaultValueFormatObj, defaultValuesObj }
