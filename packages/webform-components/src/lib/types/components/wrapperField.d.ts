import { IWrapperWebformProps } from "./wrapper"

export type TWrapperFieldWebformProps = Omit<
  IWrapperWebformProps,
  'wrapperElement' | 'fieldKey' | 'classNameFieldName' | 'innerPropsLabel'
>
