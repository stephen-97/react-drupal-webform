import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
} from '../form.d'
import { TDeepRequiredClassNames } from '../deepRequired'

export type TFormMultiStepProps = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  elementsSource: Record<string, any>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: TWebformNormalizedStateMessages
  classNames: TDeepRequiredClassNames
  components?: any
  yup: {
    yupUseFormProps?: Record<string, any>
  }
}
