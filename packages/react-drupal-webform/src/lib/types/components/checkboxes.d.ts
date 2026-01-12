import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface CheckboxesProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['div']
  className?: string
  inputProps?: JSX.IntrinsicElements['input']
  labelProps?: JSX.IntrinsicElements['label']
  itemProps?: JSX.IntrinsicElements['div']
}
