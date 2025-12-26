import { IWrapperWebformProps } from "./wrapper"

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
