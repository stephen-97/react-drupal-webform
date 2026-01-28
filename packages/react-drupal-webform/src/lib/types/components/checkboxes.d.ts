import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface CheckboxesProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['div']
  className?: string
  inputProps?: JSX.IntrinsicElements['input']
  labelProps?: JSX.IntrinsicElements['label']
  itemProps?: JSX.IntrinsicElements['div']
  onChange?: (_value: string[]) => void
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void
}
