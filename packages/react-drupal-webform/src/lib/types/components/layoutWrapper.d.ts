import { TFieldWebformObj } from './field'
import React, { JSX } from 'react'

export interface LayoutProps extends TFieldWebformObj {
  children: React.ReactNode
  className?: string
  innerProps?: JSX.IntrinsicElements['div']
}
