import React from 'react'
import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from '@/lib/types/form.d'

export interface ILabelWebformProps {
  title?: string
  className?: string
  children?: React.ReactNode
  innerProps?: jsx.JSX.IntrinsicElements['label']
  custom_component_wysiwyg?: TWebformCustomComponents['wysiwyg']
  custom_component_help?: TWebformCustomComponents['help']
  isRequired?: boolean
  helps?: {
    help?: string
    processed_help_title?: string
  }
}
