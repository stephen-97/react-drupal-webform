import { JSX, ReactElement } from 'react'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { TElementSource } from './field'

export interface FieldContainerProps {
  children: ReactElement
  isLabel?: boolean
  className?: string
  field: TElementSource
  classNames: Required<TWebformClassNames>
  classNamePrefix: string
  components: TWebformCustomComponents
  fieldKey: string
  wrapperElement?: 'div' | 'fieldset'
  innerProps?: JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['fieldset']
}
