import { jsx } from '@emotion/react'
import { DrupalElementCommonProps } from '../form.d'

export interface DescriptionProps extends DrupalElementCommonProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
}
