import { ReactNode } from 'react'
import { DrupalElementCommonProps } from '../form.d'

export interface ErrorMessageProps extends DrupalElementCommonProps {
  className?: string
  children?: ReactNode
  innerRef?: (instance: HTMLDivElement | null) => void
}
