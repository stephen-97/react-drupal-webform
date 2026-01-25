import { jsx } from '@emotion/react'
import { DrupalElementCommonNoFieldProps } from '../form.d'

export interface LoaderProps extends DrupalElementCommonNoFieldProps {
  innerProps?: jsx.JSX.IntrinsicElements['span']
  className?: string
}
