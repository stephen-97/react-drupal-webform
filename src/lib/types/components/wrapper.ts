import { JSX, ReactElement } from 'react'
import {
  TWebformClassNameFields,
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'
import { FieldError } from 'react-hook-form'
import { TElementSource } from '@/lib/types/components/field'
import { ILabelWebformProps } from '@/lib/types/components/label'

export interface IWrapperWebformProps {
  children: ReactElement
  isLabel?: boolean
  className?: string
  field: TElementSource
  classNames: Required<TWebformClassNames>
  classNameFieldName: keyof Required<TWebformClassNameFields>
  stateError?: FieldError | undefined
  components: TWebformCustomComponents
  fieldKey: string
  innerPropsLabelComponent?: Partial<ILabelWebformProps>
  wrapperElement?: keyof JSX.IntrinsicElements
}
