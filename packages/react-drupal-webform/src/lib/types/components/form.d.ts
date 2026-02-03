import React, { JSX } from 'react'
import { TFieldWebformObj } from './field'
import { TValidationMode } from '../form.d'
export interface FormProps extends TFieldWebformObj {
  children?: React.ReactNode
  className?: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  innerProps?: JSX.IntrinsicElements['form']
  validationEngine?: 'rhf' | 'html'
  disableActionButtonWhenInvalid?: boolean
}
