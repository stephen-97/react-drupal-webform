import { jsx } from '@emotion/react'
import { TFileWithBase64 } from '../form.d'

export interface IManagedFilePreviewWebformProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  value: TFileWithBase64 | {}
  handleRemove: Function
}
