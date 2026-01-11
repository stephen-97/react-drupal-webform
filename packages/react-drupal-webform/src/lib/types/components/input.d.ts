import { JSX } from 'react'
import { TFieldWebformObj } from './field'
export interface InputProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['input']
  className?: string
}
