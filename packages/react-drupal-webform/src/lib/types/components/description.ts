import { jsx } from '@emotion/react'
import { DrupalElementCommonProps } from '../form'

export interface DescriptionProps extends DrupalElementCommonProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  innerRef?: (instance: HTMLElement | null) => void
}
