import { UseFormProps } from 'react-hook-form'
import { JSX, ReactElement, InputHTMLAttributes } from 'react'
import { ILabel } from '@/components/webform/form/fields/fields-sub-components/label'
import { TDrupal_FieldType } from '@/lib/types/field'

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

type TWebformDefaultFieldValues = {
  [K in TWebformStatesFieldTypes]?: TDefaultValue
}

type TWebformMessageSpecificFields = {
  [K in TWebformStatesFieldTypes]?: string | null
}

type TWebformClassNameFields = {
  fieldInput?: string
  fieldSelect?: string
  fieldCheckboxes?: string
  fieldRadio?: string
  fieldTextarea?: string
}

type TWebformClassNames = {
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

type TWebformStateMessages = {
  general?: {
    errorMessage?: string
    requiredMessage?: string
  }
  fields?: {
    errorMessages: TWebformMessageSpecificFields
    requiredMessages: TWebformMessageSpecificFields
  }
}

type TWebform = {
  elementsSource: string
  confirmationPath: string
  yup: TYup
  components?: {
    label?: (_props: ILabel) => JSX.Element
    input?: (
      _props: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
    ) => JSX.Element
    wrapper?: ReactElement
  }
  validators?: any
  valueFormat?: TWebformValueFormat
  defaultFieldValues?: TWebformDefaultFieldValues
  classNames?: TWebformClassNames
  defaultFieldStateMessages?: TWebformStateMessages
}

export type {
  TYup,
  TFormatFieldMulti,
  TWebform,
  TWebformValueFormat,
  TWebformDefaultFieldValues,
  TWebformClassNames,
  TWebformClassNameFields,
  TWebformStateMessages,
}
