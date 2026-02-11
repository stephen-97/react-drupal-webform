import { FieldContainerProps } from './fieldContainer'

export type WrapperMoreProps = Omit<
  FieldContainerProps,
  | 'wrapperElement'
  | 'stateError'
  | 'classNameFieldName'
  | 'isLabel'
  | 'children'
  | 'innerPropsLabel'
>
