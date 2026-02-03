import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface SelectProps extends TFieldWebformObj {
  innerProps?: JSX.IntrinsicElements['select']
  className?: string
  onChange?: (_event: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (_event: React.FocusEvent<HTMLSelectElement>) => void
  onFocus?: (_event: React.FocusEvent<HTMLSelectElement>) => void
}
