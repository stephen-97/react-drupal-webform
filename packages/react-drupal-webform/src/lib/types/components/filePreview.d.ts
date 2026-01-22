import { jsx } from '@emotion/react'
import { TFileWithBase64 } from '../form.d'

export interface ManagedFilePreviewProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  value: TFileWithBase64 | {}
  handleRemove: Function
}
