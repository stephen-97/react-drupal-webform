import { jsx } from '@emotion/react'

export interface IButtonWebformProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  title: string
  fillType?: 'fill' | 'border'
  size?: 'default' | 'small'
}
