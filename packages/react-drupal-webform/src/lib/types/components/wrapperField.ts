import { FieldContainerProps } from './fieldContainer'

export type WrapperFieldProps = Omit<
  FieldContainerProps,
  'wrapperElement' | 'classNameFieldName' | 'innerPropsLabel'
>
