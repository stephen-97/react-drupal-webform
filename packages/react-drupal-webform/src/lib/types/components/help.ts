import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from '../form.d'

export interface IHelpProps {
  innerProps?: jsx.JSX.IntrinsicElements['button']
  components: TWebformCustomComponents
  helps?: {
    help?: string
    processed_help_title?: string
  }
}
