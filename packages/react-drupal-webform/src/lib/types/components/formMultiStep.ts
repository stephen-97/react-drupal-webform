import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
} from '../form'

export type TFormMultiStepProps = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  elementsSource: Record<string, any>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  rhfDefaultFieldStateMessages: TWebformNormalizedStateMessages
  components?: any
}
