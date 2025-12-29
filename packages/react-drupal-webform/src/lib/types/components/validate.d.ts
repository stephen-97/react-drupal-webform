import {
  TWebformCustomValidators,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
} from '../form.d'
import { TElementSource } from './field'

export interface TFieldValidate {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  required: boolean
  options?: string[]
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: TWebformNormalizedStateMessages
  customValidators?: TWebformCustomValidators
  requiredMessage: string
  errorMessage: string
  watchedValues?: Record<string, any>
}
