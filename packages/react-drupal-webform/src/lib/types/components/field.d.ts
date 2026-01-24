import { TWebformCustomComponents } from '../form.d'
import { TDeepRequiredClassNames } from '../deepRequired'

export type TDrupal_FieldType =
  | 'checkbox'
  | 'checkboxes'
  | 'entity_checkboxes'
  | 'term_checkboxes'
  | 'date'
  | 'email'
  | 'webform_markup'
  | 'webform_actions'
  | 'textarea'
  | 'textfield'
  | 'radios'
  | 'radios_entity'
  | 'number'
  | 'tel'
  | 'select'
  | 'entity_select'
  | 'term_select'
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
  '#size'?: number
  '#pattern'?: string
  '#states': {
    visible: Record<string, Record<string, string>>
  }
  '#attributes'?: {
    class?: string[]
  }
  '#wrapper_attributes'?: {
    class?: string[]
  }
  '#empty_option'?: string
  '#empty_value'?: string
  '#sort_options'?: boolean
}

export type TFieldWebformObj = {
  index: number
  fieldKey: string
  field: TElementSource
  submitButtonRef?: any
  isMultiStep?: boolean
  classNames: TDeepRequiredClassNames
  classNamePrefix: string | undefined | null
  components: TWebformCustomComponents
  ariaDescribedBy?: string
}
