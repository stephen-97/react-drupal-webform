import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'

export interface FormProps extends TFieldWebformObj {
  children?: React.ReactNode
  className?: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  innerProps?: JSX.IntrinsicElements['form']
}
