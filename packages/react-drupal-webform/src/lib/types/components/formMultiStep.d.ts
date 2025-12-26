import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
} from '../form.d'
import { DeepRequired } from 'react-hook-form'
import { TDeepRequiredClassNames } from '../deepRequired'

export type TFormMultiStepProps = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  elementsSource: Record<string, any>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
  classNames: TDeepRequiredClassNames
  components?: any
  yup: {
    yupUseFormProps?: Record<string, any>
  }
}
