import { jsx } from '@emotion/react'
import { DrupalElementCommonNoFieldProps } from '../form'

export interface LoaderProps extends DrupalElementCommonNoFieldProps {
  innerProps?: jsx.JSX.IntrinsicElements['span']
  className?: string
  innerRef?: (instance: HTMLSpanElement | null) => void
}
