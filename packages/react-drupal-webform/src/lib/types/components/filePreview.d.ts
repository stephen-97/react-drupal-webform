import { jsx } from '@emotion/react'
import { DrupalElementCommonProps, TFileWithBase64 } from '../form.d'

export interface ManagedFilePreviewProps extends DrupalElementCommonProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  value: TFileWithBase64 | {}
  handleRemove: Function
}
