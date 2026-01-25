import { JSX, ReactElement } from 'react'
import { DrupalElementCommonProps } from '../form.d'

export interface FieldContainerProps extends DrupalElementCommonProps {
  children: ReactElement
  isLabel?: boolean
  className?: string
  wrapperElement?: 'div' | 'fieldset'
  innerProps?: JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['fieldset']
}
