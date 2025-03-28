import { UseFormProps } from 'react-hook-form'

type TYup = {
  yupUseFormProps: Omit<UseFormProps, 'resolver'>
  yupObject?: Record<string, any>
  defaultValues?: Record<string, any>
}
type TFormatFieldMulti = 'value' | 'keyValue' | 'booleanMap'

type TWebformValueFormat = {
  radio?: TFormatFieldMulti
  select?: TFormatFieldMulti
  checkboxes?: TFormatFieldMulti
}

type TWebform = {
  elementsSource: string
  confirmationPath: string
  yup: TYup
  components?: any
  validators?: any
  valueFormat?: TWebformValueFormat
}

export type { TYup, TFormatFieldMulti, TWebform, TWebformValueFormat }
