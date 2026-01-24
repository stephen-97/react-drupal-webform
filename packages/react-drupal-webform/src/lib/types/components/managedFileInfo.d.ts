import { TElementSource } from './field'
import { jsx } from '@emotion/react'

export interface ManagedFileInfoProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  classNamePrefix: string
  field: TElementSource
  fieldKey: string
}
