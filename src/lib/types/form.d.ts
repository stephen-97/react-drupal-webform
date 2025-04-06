import { UseFormProps } from 'react-hook-form'

type TYup = {
  yupUseFormProps: Omit<UseFormProps, 'resolver'>
  yupObject?: Record<string, any>
  yupDefaultValues?: Record<string, any>
}
type TFormatFieldMulti = 'key' | 'value' | 'keyValue' | 'booleanMap'

type TWebformValueFormat = {
  radio?: TFormatFieldMulti
  select?: TFormatFieldMulti
  checkboxes?: TFormatFieldMulti
}

type TDefaultValue = string | number | boolean | Record<string, any>

type TWebformDefaultFieldValues = {
  textfield?: TDefaultValue
  textarea?: TDefaultValue
  email?: TDefaultValue
  radio?: TDefaultValue
  select?: TDefaultValue
  checkboxes?: TDefaultValue
  checkbox?: TDefaultValue
  number?: TDefaultValue
  tel?: TDefaultValue
}

type TWebform = {
  elementsSource: string
  confirmationPath: string
  yup: TYup
  components?: any
  validators?: any
  valueFormat?: TWebformValueFormat
  defaultFieldValues?: TWebformDefaultFieldValues
  classNames?: {
    general?: {
      fields: string
    }
  }
}

export type {
  TYup,
  TFormatFieldMulti,
  TWebform,
  TWebformValueFormat,
  TWebformDefaultFieldValues,
}
