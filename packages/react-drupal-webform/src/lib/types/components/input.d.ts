import { TFieldWebformObj } from './field'
import { InputProps as HTMLInputProps } from 'react-html-props'
export interface InputProps extends TFieldWebformObj, HTMLInputProps {
  innerProps?: HTMLInputProps
}
