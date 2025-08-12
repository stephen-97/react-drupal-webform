import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TDeepRequiredClassNames } from '@/lib/types/deepRequired'

export type TFormMultiStepProps = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  elementsSource: Record<string, any>
  valueFormat: Required<TWebformValueFormat>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
  classNames: TDeepRequiredClassNames
  components?: any
  yup: {
    yupUseFormProps?: Record<string, any>
  }
}
