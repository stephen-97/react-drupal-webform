import { JSX, ReactElement } from 'react'
import { DrupalElementCommonProps } from '../form.d'
import { ElementProps } from 'react-html-props'

export interface FieldContainerProps
  extends DrupalElementCommonProps,
    ElementProps {
  children: ReactElement
  isLabel?: boolean
  wrapperElement?: 'div' | 'fieldset'
  innerProps?: JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['fieldset']
}
