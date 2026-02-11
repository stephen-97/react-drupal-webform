import { jsx } from '@emotion/react'
import { DrupalElementCommonProps } from '../form'

export interface HelpProps extends DrupalElementCommonProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  className?: string
  innerRef?: (instance: HTMLButtonElement | null) => void
}
