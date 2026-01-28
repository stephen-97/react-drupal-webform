import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface TextAreaProps extends TFieldWebformObj {
  className?: string
  innerProps?: JSX.IntrinsicElements['textarea']
  onChange?: (_event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (_event: React.FocusEvent<HTMLTextAreaElement>) => void
  onFocus?: (_event: React.FocusEvent<HTMLTextAreaElement>) => void
}
