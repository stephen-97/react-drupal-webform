import React from 'react'

export type TWysiwygSource = 'help' | 'more' | 'description' | 'markup'

export interface WysiwygProps {
  as?: React.ElementType
  className?: string
  source: TWysiwygSource
  processed: string
}
