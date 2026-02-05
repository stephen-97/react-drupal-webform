import { jsx } from '@emotion/react'
import { DrupalElementCommonProps } from '../form'

export interface ManagedFileInfoProps extends DrupalElementCommonProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  innerRef?: (instance: HTMLDivElement | null) => void
}
