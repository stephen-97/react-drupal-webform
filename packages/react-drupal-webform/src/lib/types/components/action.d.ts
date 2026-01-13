import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface ActionProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['button']
}
