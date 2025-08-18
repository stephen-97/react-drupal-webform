import { TWebformCustomComponents, TWebformValueFormat } from '../form.d'
import { FocusEventHandler } from 'react'
import { TDeepRequiredClassNames } from '../deepRequired'

type TDrupal_FieldType =
  | 'checkbox'
  | 'checkboxes'
  | 'date'
  | 'email'
  | 'webform_markup'
  | 'webform_actions'
  | 'textarea'
  | 'textfield'
  | 'radios'
  | 'number'
  | 'tel'
  | 'select'
  | 'managed_file'
  | 'hidden'

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
  '#states': {
    visible: Record<string, Record<string, string>>
  }
  '#attributes'?: {
    class?: string[]
  }
  '#wrapper_attributes'?: {
    class?: string[]
  }
}

export type TFieldWebformObj = {
  index: number
  key: string
  field: TElementSource
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  submitButtonRef?: any
  isMultiStep?: boolean
  valueFormat: Required<TWebformValueFormat>
  classNames: TDeepRequiredClassNames
  components: TWebformCustomComponents
}

export type {
  TElementSource,
  TFieldMultiNames,
  TMultiFieldNames,
  TSingleFieldNames,
  TFieldNames,
  TDrupal_FieldType,
}
