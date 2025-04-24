import React from 'react'
import { jsx } from '@emotion/react'

export interface ILabelWebformProps {
  title?: string
  className?: string
  children?: React.ReactNode
  innerProps?: jsx.JSX.IntrinsicElements['label']
  isRequired?: boolean
}
