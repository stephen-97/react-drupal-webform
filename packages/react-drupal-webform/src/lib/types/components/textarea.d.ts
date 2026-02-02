import { JSX } from 'react'
import { TFieldWebformObj } from './field'
import { TextAreaProps as HTMLTextAreaProps } from 'react-html-props'

export interface TextAreaProps extends TFieldWebformObj, HTMLTextAreaProps {
  innerProps?: JSX.IntrinsicElements['textarea']
}
