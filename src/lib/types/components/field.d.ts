import { Control, DeepRequired } from 'react-hook-form'
import {
  TWebformClassNames,
  TWebformCustomComponents,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { FocusEventHandler } from 'react'

type TDrupal_FieldType =
  | 'checkbox'
  | 'checkboxes'
  | 'date'
  | 'email'
  | 'webform_markup'
  | 'textarea'
  | 'textfield'
  | 'number'
  | 'tel'
  | 'select'
  | 'managed_file'

type TElementSource = {
  '#type': TDrupal_FieldType
  '#title': string
  '#required'?: boolean
  '#placeholder'?: string
  '#options'?: any
  '#options_display'?: string
  '#max_filesize'?: number
  '#min'?: number
  '#max'?: number
  '#default_value'?: string
  '#description_display'?: string
  '#description'?: string
  '#file_extensions'?: string
  '#file_placeholder'?: string
  '#help'?: string
  '#help_title'?: string
  '#markup'?: string
  '#minlength'?: number
  '#maxlength'?: number
  '#more_title'?: string
  '#more'?: string
  '#required_error'?: string
  '#rows'?: number
  '#field_prefix'?: string
  '#field_suffix'?: string
  '#submit__label'?: string
  '#attributes'?: {
    class?: string[]
  }
  '#wrapper_attributes'?: {
    class?: string[]
  }
}

type TFieldValidate = {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  visibility: boolean
  options?: string[]
  valueFormat: TWebformValueFormat
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
}

type TMultiFieldNames = 'radios' | 'select' | 'checkboxes'
type TSingleFieldNames = 'number' | 'textfield' | 'email'
type TFieldNames = TMultiFieldNames & TSingleFieldNames

export type TFieldObj = {
  index: number
  key: string
  field: TElementSource
  control: Control<{}, any>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  keyForMap: string
  submitButtonRef?: any
  isValid?: boolean
  isMultiStep?: boolean
  valueFormat: Required<TWebformValueFormat>
  classNames: Required<TWebformClassNames>
  components: TWebformCustomComponents
}

export type {
  TElementSource,
  TFieldValidate,
  TFieldMultiNames,
  TMultiFieldNames,
  TSingleFieldNames,
  TFieldNames,
  TDrupal_FieldType,
}
