import {
  TWebform,
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
} from '../form.d'

export type TFormMultiStepProps = Omit<
  TWebform,
  'elementsSource' | 'valueFormat' | 'defaultFieldValues' | 'classNames'
> & {
  elementsSource: Record<string, any>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: TWebformNormalizedStateMessages
  components?: any
}
