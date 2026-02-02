import { JSX } from 'react'
import { TFieldWebformObj } from './field'
import { SelectProps as HTMLSelectProps } from 'react-html-props'

export interface SelectProps extends TFieldWebformObj, HTMLSelectProps {
  innerProps?: JSX.IntrinsicElements['select']
}
