import { TFieldWebformObj } from './field'
import { JSX } from 'react'

export interface LayoutTitleProps extends TFieldWebformObj {
  className?: string
  innerProps?: JSX.IntrinsicElements['div']
}
