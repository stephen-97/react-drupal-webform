import { TWebformCustomComponents } from '../form.d'
import { FocusEventHandler } from 'react'
import { TDeepRequiredClassNames } from '../deepRequired'

export type TDrupal_FieldType =
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
  | 'fieldset'
  | 'webform_flexbox'
  | 'webform_section'
  | 'container'
  | 'details'

export type TDrupalLayoutFieldType =
  | 'container'
  | 'webform_flexbox'
  | 'webform_section'
  | 'details'
  | 'fieldset'

export type TDrupalNonValueFieldType =
  | TDrupalLayoutFieldType
  | 'webform_actions'
  | 'webform_markup'

export type TDrupalValueFieldType = Exclude<
  TDrupal_FieldType,
  TDrupalNonValueFieldType
>

export type TElementSource = {
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
  fieldKey: string
  field: TElementSource
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  submitButtonRef?: any
  isMultiStep?: boolean
  classNames: TDeepRequiredClassNames
  components: TWebformCustomComponents
}
