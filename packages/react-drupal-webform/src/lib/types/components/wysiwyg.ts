import React from 'react'

export type TWysiwygSource = 'help' | 'more' | 'description' | 'markup'

export interface IWysiwygProps {
  as?: React.ElementType
  className?: string
  source: TWysiwygSource
  processed: string
}
