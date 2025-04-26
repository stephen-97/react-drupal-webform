import { jsx } from '@emotion/react'

export interface IHelpProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  helps?: {
    help?: string
    processed_help_title?: string
  }
}
