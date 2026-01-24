import React from 'react'
import { jsx } from '@emotion/react'

export type TWysiwygSource = 'help' | 'more' | 'description' | 'markup'

export interface WysiwygProps {
  as?: React.ElementType
  className?: string
  classNamePrefix: string | null | undefined
  source: TWysiwygSource
  processed: string
  innerProps?: jsx.JSX.IntrinsicElements['div']
}
