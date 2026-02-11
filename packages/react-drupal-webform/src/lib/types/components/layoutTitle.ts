import { TFieldWebformObj } from './field'
import React from 'react'

export interface LayoutTitleProps extends TFieldWebformObj {
  className?: string
  innerProps?: React.HTMLAttributes<HTMLElement>
  innerRef?: (instance: HTMLElement | null) => void
}
