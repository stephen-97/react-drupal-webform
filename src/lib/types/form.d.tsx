import { UseFormProps } from 'react-hook-form'
import { JSX } from 'react'
import { ILabelWebformProps } from '@/lib/types/components/label'
import { TDrupal_FieldType } from '@/lib/types/components/field'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import { IErrorMessageWebformProps } from '@/lib/types/components/errorMessage'
import { TFieldObjCustom } from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'

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
  wrapper?: (_props: IWrapperWebformProps) => JSX.Element
  errorFieldMessage?: (_props: IErrorMessageWebformProps) => JSX.Element
  email?: (_props: TFieldObjCustom) => JSX.Element
  number?: (_props: TFieldObjCustom) => JSX.Element
  textfield?: (_props: TFieldObjCustom) => JSX.Element
  tel?: (_props: TFieldObjCustom) => JSX.Element
  textarea?: (_props: TFieldObjCustom) => JSX.Element
  date?: (_props: TFieldObjCustom) => JSX.Element
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
