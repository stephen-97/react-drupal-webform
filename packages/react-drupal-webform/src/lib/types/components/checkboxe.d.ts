import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface CheckboxProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['input']
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void
}
