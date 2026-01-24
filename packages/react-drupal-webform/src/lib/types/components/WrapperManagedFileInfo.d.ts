import { FieldContainerProps } from './fieldContainer'

export type WrapperManagedFileInfoProps = Omit<
  FieldContainerProps,
  | 'wrapperElement'
  | 'stateError'
  | 'classNameFieldName'
  | 'isLabel'
  | 'children'
  | 'className'
  | 'innerPropsLabel'
  | 'classNames'
>
