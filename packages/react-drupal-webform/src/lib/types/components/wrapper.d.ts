import { JSX, ReactElement } from 'react'
import {
  TWebformClassNameFields,
  TWebformClassNames,
  TWebformCustomComponents,
} from '../form.d'
import { FieldError } from 'react-hook-form'
import { TElementSource } from './field'

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
  wrapperElement?: keyof JSX.IntrinsicElements
}
