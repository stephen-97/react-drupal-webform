import { JSX } from 'react'
import { TFieldWebformObj } from './field'
export interface MarkupProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['div']
  className?: string
}
