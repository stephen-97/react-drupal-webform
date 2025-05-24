import { IWrapperWebformProps } from '@/lib/types/components/wrapper'

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
