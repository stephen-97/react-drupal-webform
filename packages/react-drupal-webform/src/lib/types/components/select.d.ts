import { JSX } from 'react'
import { TFieldWebformObj } from './field'
export interface SelectProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['select']
  className?: string
}
