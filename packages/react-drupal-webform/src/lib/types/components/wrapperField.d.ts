import { IWrapperWebformProps } from './wrapper'

export type TWrapperFieldWebformProps = Omit<
  IWrapperWebformProps,
  'wrapperElement' | 'classNameFieldName' | 'innerPropsLabel'
>
