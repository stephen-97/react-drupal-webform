import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface RadiosProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['div']
  itemProps?: JSX.IntrinsicElements['div']
  inputProps?: JSX.IntrinsicElements['input']
  labelProps?: JSX.IntrinsicElements['label']
  className?: string
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void
}
