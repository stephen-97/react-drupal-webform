import { IWrapperWebformProps } from '@/lib/types/components/wrapper'

export type TWrapperFieldWebformProps = Omit<
  IWrapperWebformProps,
  'wrapperElement' | 'fieldKey' | 'classNameFieldName' | 'innerPropsLabel'
>
