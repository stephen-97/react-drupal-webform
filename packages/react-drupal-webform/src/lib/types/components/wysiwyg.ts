import React from 'react'
import { jsx } from '@emotion/react'
import { DrupalElementCommonProps } from '../form'

export type TWysiwygSource = 'help' | 'more' | 'description' | 'markup'

export interface WysiwygProps extends DrupalElementCommonProps {
  as?: React.ElementType
  className?: string
  source: TWysiwygSource
  processed: string
  innerProps?: jsx.JSX.IntrinsicElements['div']
  innerRef?: (instance: HTMLElement | null) => void
}
