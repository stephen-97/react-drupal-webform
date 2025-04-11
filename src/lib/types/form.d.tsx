import { UseFormProps } from 'react-hook-form'
import { JSX, ReactElement } from 'react'
import { ILabelWebformProps } from '@/lib/types/components/label'
import { TDrupal_FieldType } from '@/lib/types/components/field'

export type TYup = {
  yupUseFormProps: Omit<UseFormProps, 'resolver'>
  yupObject?: Record<string, any>
  yupDefaultValues?: Record<string, any>
}
export type TFormatFieldMulti = 'key' | 'value' | 'keyValue' | 'booleanMap'

export type TWebformValueFormat = {
  radio?: TFormatFieldMulti
  select?: TFormatFieldMulti
  checkboxes?: TFormatFieldMulti
}

export type TDefaultValue = string | number | boolean | Record<string, any>

export type TWebformStatesFieldTypes =
  | 'textfield'
  | 'textarea'
  | 'email'
  | 'radio'
  | 'checkboxes'
  | 'checkbox'
  | 'number'
  | 'tel'
  | 'date'
  | 'managedFile'
  | 'select'

export type TWebformDefaultFieldValues = {
  [K in TWebformStatesFieldTypes]?: TDefaultValue
}

export type TWebformMessageSpecificFields = {
  [K in TWebformStatesFieldTypes]?: string | null
}

export type TWebformClassNameFields = {
  fieldInput?: string
  fieldSelect?: string
  fieldCheckboxes?: string
  fieldRadio?: string
  fieldTextarea?: string
}

export type TWebformClassNames = {
  general?: {
    fieldWrapper?: string
    fieldLabel?: string
  }
  states?: {
    fieldError?: string
    fieldErrorMessage?: string
  }
  fields?: TWebformClassNameFields
  types?: Partial<Record<TDrupal_FieldType, string>>
}

export type TWebformStateMessages = {
  general?: {
    errorMessage?: string
    requiredMessage?: string
  }
  fields?: {
    errorMessages?: TWebformMessageSpecificFields
    requiredMessages?: TWebformMessageSpecificFields
  }
}

export type TWebformCustomComponents = {
  label?: (_props: ILabelWebformProps) => JSX.Element
  wrapper?: ReactElement
}

export type TWebform = {
  elementsSource: string
  confirmationPath: string
  yup: TYup
  components?: TWebformCustomComponents
  validators?: any
  valueFormat?: TWebformValueFormat
  defaultFieldValues?: TWebformDefaultFieldValues
  classNames?: TWebformClassNames
  defaultFieldStateMessages?: TWebformStateMessages
}
