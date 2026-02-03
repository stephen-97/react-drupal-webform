import { jsx } from '@emotion/react'
import { DrupalElementCommonProps } from '../form.d'

export interface ButtonProps extends DrupalElementCommonProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  className?: string
  title: string
  fillType?: 'fill' | 'border'
  size?: 'default' | 'small'
  innerRef?: (instance: HTMLButtonElement | null) => void
}
