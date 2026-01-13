import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface TextAreaProps extends TFieldWebformObj {
  className?: string
  innerProps?: JSX.IntrinsicElements['textarea']
}
