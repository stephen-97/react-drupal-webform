import { IWrapperWebformProps } from './wrapper'

export type WrapperDescriptionProps = Omit<
  IWrapperWebformProps,
  | 'wrapperElement'
  | 'classNameFieldName'
  | 'innerPropsLabel'
  | 'isLabel'
  | 'stateError'
  | 'children'
>
