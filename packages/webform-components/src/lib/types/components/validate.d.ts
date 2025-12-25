import {
  TWebformCustomValidators,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
} from '../form.d'
import { DeepRequired } from 'react-hook-form'
import { TElementSource } from './field'

export interface TFieldValidate {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  required: boolean
  options?: string[]
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
  customValidators?: TWebformCustomValidators
  requiredMessage: string
  errorMessage: string
  watchedValues?: Record<string, any>
}
