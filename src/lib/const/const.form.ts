import {
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformMessages,
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
  checkboxes: [],
  checkbox: false,
  number: '',
  tel: '',
  date: '',
  managedFile: '',
  select: '',
}

const defaultValuesStateMessages: DeepRequired<TWebformMessages> = {
  general: {
    errorMessage: 'Field Error',
    requiredMessage: 'Field is Required',
  },
  fields: {
    errorMessages: {
      textfield: '',
      textarea: '',
      email: '',
      radio: '',
      checkboxes: '',
      checkbox: '',
      number: '',
      tel: '',
      date: '',
      managedFile: '',
      select: '',
    },
    requiredMessages: {
      textfield: '',
      textarea: '',
      email: '',
      radio: '',
      checkboxes: '',
      checkbox: '',
      number: '',
      tel: '',
      date: '',
      managedFile: '',
      select: '',
    },
  },
}

const defaultValuesClassnames: DeepRequired<TWebformClassNames> = {
  general: {
    fieldWrapper: '',
    fieldLabel: '',
  },
  states: {
    fieldError: '',
    fieldErrorMessage: '',
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
export {
  defaultValueFormatObj,
  defaultValuesObj,
  defaultValuesClassnames,
  defaultValuesStateMessages,
}
