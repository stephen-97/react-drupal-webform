import {
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import Label from '@/components/webform/form/fields/fields-sub-components/label'

export const defaultValueFormatObj: Required<TWebformValueFormat> = {
  radio: 'booleanMap',
  select: 'booleanMap',
  checkboxes: 'booleanMap',
}

export const defaultValuesObj: Required<TWebformDefaultFieldValues> = {
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

export const defaultValuesFieldStateMessages: DeepRequired<TWebformStateMessages> =
  {
    general: {
      errorMessage: 'Field Error Mince',
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

export const defaultValuesClassnames: DeepRequired<TWebformClassNames> = {
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

export const components = {
  LabelWebform: Label,
}
