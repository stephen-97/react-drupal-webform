// lib/types/components/radios.ts
import { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface RadiosProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['div']
  itemProps?: JSX.IntrinsicElements['div']
  inputProps?: JSX.IntrinsicElements['input']
  labelProps?: JSX.IntrinsicElements['label']
  className?: string
}
