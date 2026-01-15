import { ReactNode } from 'react'
import { TWebformClassNames } from '../form.d'
import { TWebformComponents } from '../component-list'
import { TElementSource } from './field'

export interface ErrorMessageProps {
  message?: string
  className?: string
  classNames: TWebformClassNames
  components: TWebformComponents
  field: TElementSource
  filedKey: string
  children?: ReactNode
}
