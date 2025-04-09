import {
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'

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
  tel: '',
  date: '',
}

const defaultValuesClassnames: DeepRequired<TWebformClassNames> = {
  general: {
    fieldWrapper: '',
    fieldLabel: '',
  },
  states: {
    fieldError: '',
  },
  fields: {
    fieldInput: '',
    fieldSelect: '',
    fieldCheckboxes: '',
    fieldRadio: '',
    fieldTextarea: '',
  },
  types: {
    checkbox: '',
    checkboxes: '',
    tel: '',
    textfield: '',
    textarea: '',
    date: '',
    email: '',
    webform_markup: '',
    select: '',
    number: '',
  },
}
export { defaultValueFormatObj, defaultValuesObj, defaultValuesClassnames }
