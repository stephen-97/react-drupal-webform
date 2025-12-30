import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
  TWebformResolvedStateMessages,
} from '../form.d'
import { TDeepRequiredClassNames } from '../deepRequired'

type TMultiStepExtra = {
  step: number
  lastStep: number
  isConditionalMultiStep: boolean
}

export interface IFormDefaultWebformProps
  extends Omit<
    TWebform,
    'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
  > {
  multiStepExtra?: TMultiStepExtra
  elementsSource: Record<string, any>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: TWebformNormalizedStateMessages
  classNames: TDeepRequiredClassNames
  components?: any
  yup: {
    yupUseFormProps?: Record<string, any>
  }
  includeInactiveFieldsInSubmit?: boolean
  onSubmit?: (data: Record<string, any>) => void
}
