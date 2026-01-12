import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface TextareaProps extends TFieldWebformObj {
  className?: string
  innerProps?: JSX.IntrinsicElements['textarea']
}
