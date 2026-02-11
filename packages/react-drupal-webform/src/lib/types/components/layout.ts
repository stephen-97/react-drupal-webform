import { TFieldWebformObj } from './field'
import React from 'react'

export interface LayoutProps extends TFieldWebformObj {
  children: React.ReactNode
  className?: string
  innerProps?: React.HTMLAttributes<HTMLElement>
  innerRef?: (instance: HTMLElement | null) => void
}
