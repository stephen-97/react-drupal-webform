import {
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TElementSource } from '@/lib/types/components/field'

export interface TFieldValidate {
  yupObject: Record<string, any>
  defaultValues: Record<string, any>
  key: string
  field: TElementSource
  required: boolean
  options?: string[]
  valueFormat: TWebformValueFormat
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
  requiredMessage: string
  errorMessage: string
}
