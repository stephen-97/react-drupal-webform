import { FieldContainerProps } from './fieldContainer'

export type WrapperDescriptionProps = Omit<
  FieldContainerProps,
  | 'wrapperElement'
  | 'classNameFieldName'
  | 'isLabel'
  | 'stateError'
  | 'children'
>
