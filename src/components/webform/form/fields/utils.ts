import { Control } from 'react-hook-form'
import { FocusEventHandler } from 'react'

type TElementSource = {
  '#type': string
  '#title': string
  '#required'?: boolean
  '#placeholder'?: string
  '#options'?: any
  '#max_filesize'?: number
  '#default_value'?: string
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
  visibility: boolean
  keyForMap: string
  submitButtonRef?: any
  isValid?: boolean
  isMultiStep?: boolean
  idForAnchors: string
}

type TFieldValidate = {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  visibility: boolean
  options?: string[]
  t: any
}

export type { TElementSource, TFieldObj, TFieldValidate }
