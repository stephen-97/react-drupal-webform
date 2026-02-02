import { JSX } from 'react'
import { TFieldWebformObj } from './field'
import { InputProps } from 'react-html-props'

export interface CheckboxProps extends TFieldWebformObj, InputProps {
  innerProps?: JSX.IntrinsicElements['input']
}
