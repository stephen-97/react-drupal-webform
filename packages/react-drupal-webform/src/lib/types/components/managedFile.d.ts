import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface ManagedFileProps extends TFieldWebformObj {
  className?: string
  innerProps?: JSX.IntrinsicElements['input']
}
