import { jsx } from '@emotion/react'

export interface ButtonProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  className?: string
  title: string
  fillType?: 'fill' | 'border'
  size?: 'default' | 'small'
}
