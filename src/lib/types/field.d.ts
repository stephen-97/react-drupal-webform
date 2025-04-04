import { Control } from 'react-hook-form'
import { FocusEventHandler } from 'react'
import { TWebformValueFormat } from '@/lib/types/form'

type TElementSource = {
  '#type': string
  '#title': string
  '#required'?: boolean
  '#placeholder'?: string
  '#options'?: any
  '#options_display'?: string
  '#max_filesize'?: number
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
}

type TFieldValidate = {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  visibility: boolean
  options?: string[]
  valueFormat: TWebformValueFormat
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
}
