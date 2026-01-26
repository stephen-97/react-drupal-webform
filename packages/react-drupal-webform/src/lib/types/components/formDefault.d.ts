import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
} from '../form.d'

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
  components?: any
  includeInactiveFieldsInSubmit?: boolean
  onSubmit?: (data: Record<string, any>) => void
}
