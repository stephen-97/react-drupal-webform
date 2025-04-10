import { Control, DeepRequired } from 'react-hook-form'
import { FocusEventHandler } from 'react'
import {
  TWebformClassNames,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'

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
  '#file_extensions'?: string
  '#help'?: string
  '#help_title'?: string
  '#markup'?: string
  '#minlength'?: number
  '#maxlength'?: number
  '#more_title'?: string
  '#more'?: string
  '#required_error'?: string
  '#rows'?: number
  '#field_suffix'?: string
  '#submit__label'?: string
  '#attributes'?: {
    class?: string[]
  }
  '#wrapper_attributes'?: {
    class?: string[]
  }
}

type TFieldObj = {
  index: number
  key: string
  field: TElementSource
  control: Control<{}, any>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  keyForMap: string
  submitButtonRef?: any
  isValid?: boolean
  isMultiStep?: boolean
  valueFormat: TWebformValueFormat
  classNames: Required<TWebformClassNames>
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

export type {
  TElementSource,
  TFieldObj,
  TFieldValidate,
  TFieldMultiNames,
  TMultiFieldNames,
  TSingleFieldNames,
  TFieldNames,
  TDrupal_FieldType,
}
