import { jsx } from '@emotion/react'
import { TElementSource } from './field'

export interface ButtonProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  className?: string
  classNamePrefix: string
  title: string
  fillType?: 'fill' | 'border'
  size?: 'default' | 'small'
  field: TElementSource
  fieldKey: string
}
