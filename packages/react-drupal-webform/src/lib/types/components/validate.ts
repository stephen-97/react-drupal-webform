import {
  TWebformCustomValidators,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
} from '../form'
import { TElementSource } from './field'

export interface FieldValidateProps {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  required: boolean
  options?: string[]
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  rhfDefaultFieldStateMessages: TWebformNormalizedStateMessages
  rhfCustomValidators?: TWebformCustomValidators
  requiredMessage: string
  errorMessage: string
  minLengthMessage: string
  maxLengthMessage: string
  watchedValues?: Record<string, any>
}
