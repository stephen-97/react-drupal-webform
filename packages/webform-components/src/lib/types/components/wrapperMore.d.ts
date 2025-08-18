import { IWrapperWebformProps } from "./wrapper"

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
