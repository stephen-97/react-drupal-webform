import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface CheckboxProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['input']
  className?: string
}
