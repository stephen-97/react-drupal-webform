import { JSX, ReactElement } from 'react'
import {
  TWebformClassNameFields,
  TWebformClassNames,
  TWebformCustomComponents,
} from '../form.d'
import { TElementSource } from './field'

export interface WrapperProps {
  children: ReactElement
  isLabel?: boolean
  className?: string
  field: TElementSource
  classNames: Required<TWebformClassNames>
  classNameFieldName: keyof Required<TWebformClassNameFields>
  components: TWebformCustomComponents
  fieldKey: string
  wrapperElement?: keyof JSX.IntrinsicElements
}
