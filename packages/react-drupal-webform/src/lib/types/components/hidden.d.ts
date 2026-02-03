import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface HiddenProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['input']
  className?: string
  innerRef?: (instance: HTMLInputElement | null) => void
}
