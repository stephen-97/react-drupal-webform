import { IWrapperWebformProps } from '@/lib/types/components/wrapper'

export type TWrapperDescriptionWebformProps = Omit<
  IWrapperWebformProps,
  | 'wrapperElement'
  | 'fieldKey'
  | 'classNameFieldName'
  | 'innerPropsLabel'
  | 'isLabel'
  | 'stateError'
  | 'children'
>
