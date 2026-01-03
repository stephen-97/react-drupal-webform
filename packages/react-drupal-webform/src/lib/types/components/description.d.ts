import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from '../form.d'

export interface IDescriptionWebformProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  components: TWebformCustomComponents
  processed: string
}
