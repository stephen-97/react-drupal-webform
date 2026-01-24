import { jsx } from '@emotion/react'
import { TFileWithBase64 } from '../form.d'
import { TElementSource } from './field'

export interface ManagedFilePreviewProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  classNamePrefix: string
  fieldKey: string
  field: TElementSource
  value: TFileWithBase64 | {}
  handleRemove: Function
}
