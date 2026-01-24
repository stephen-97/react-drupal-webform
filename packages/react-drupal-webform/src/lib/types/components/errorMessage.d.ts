import { ReactNode } from 'react'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { TElementSource } from './field'

export interface ErrorMessageProps {
  className?: string
  classNames: TWebformClassNames
  classNamePrefix: string
  components: TWebformCustomComponents
  field: TElementSource
  fieldKey: string
  children?: ReactNode
}
