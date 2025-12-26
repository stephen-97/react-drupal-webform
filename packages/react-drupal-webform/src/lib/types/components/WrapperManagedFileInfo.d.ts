import { IWrapperWebformProps } from "./wrapper"

export type TWrapperManagedFileInfoWebformProps = Omit<
  IWrapperWebformProps,
  | 'wrapperElement'
  | 'stateError'
  | 'classNameFieldName'
  | 'isLabel'
  | 'children'
  | 'className'
  | 'innerPropsLabel'
  | 'fieldKey'
  | 'classNames'
>
