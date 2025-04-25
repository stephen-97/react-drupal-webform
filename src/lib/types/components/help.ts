import { jsx } from '@emotion/react'

export interface IHelpProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  helps?: {
    help?: string
    help_title?: string
  }
}
