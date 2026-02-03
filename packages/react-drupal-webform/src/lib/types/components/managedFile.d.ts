import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface ManagedFileProps extends TFieldWebformObj {
  className?: string
  innerProps?: JSX.IntrinsicElements['input']
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void
  innerRef?: (instance: HTMLInputElement | null) => void
}
