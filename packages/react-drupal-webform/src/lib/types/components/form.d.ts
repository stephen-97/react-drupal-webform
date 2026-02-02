import React from 'react'
import { TFieldWebformObj } from './field'
import { TValidationMode } from '../form.d'
import { FormProps as HTMLFormProps } from 'react-html-props'
export interface FormProps extends TFieldWebformObj, HTMLFormProps {
  children?: React.ReactNode
  innerProps?: HTMLFormProps
  validationMode: TValidationMode
  disableActionButtonWhenInvalid?: boolean
}
