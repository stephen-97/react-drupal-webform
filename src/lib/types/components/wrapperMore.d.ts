import { IWrapperWebformProps } from '@/lib/types/components/wrapper'

export type TWrapperMoreWebformProps = Omit<
  IWrapperWebformProps,
  | 'wrapperElement'
  | 'stateError'
  | 'classNameFieldName'
  | 'isLabel'
  | 'children'
  | 'fieldKey'
  | 'innerPropsLabel'
  | 'field'
> & {
  fieldMore: string
  fieldMoreTitle: string
}
