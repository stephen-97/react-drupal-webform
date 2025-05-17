import { jsx } from '@emotion/react'
import { TFileWithBase64 } from '@/lib/types/form.d'

export interface IFilePreviewWebformProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  value: TFileWithBase64 | {}
  handleRemove: Function
}
