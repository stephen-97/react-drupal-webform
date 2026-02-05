import { JSX, ReactElement } from 'react'
import { DrupalElementCommonProps } from '../form'

export interface FieldContainerProps extends DrupalElementCommonProps {
  children: ReactElement
  isLabel?: boolean
  className?: string
  wrapperElement?: 'div' | 'fieldset'
  innerProps?: JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['fieldset']
  innerRef?: (instance: HTMLElement | null) => void
}
