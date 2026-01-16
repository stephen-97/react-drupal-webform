import { ReactNode } from 'react'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { TElementSource } from './field'

export interface ErrorMessageProps {
  message?: string
  className?: string
  classNames: TWebformClassNames
  components: TWebformCustomComponents
  field: TElementSource
  filedKey: string
  children?: ReactNode
}
