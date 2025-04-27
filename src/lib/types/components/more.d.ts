import { jsx } from '@emotion/react'

export interface IMoreProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  more?: {
    more_title?: string
    processed_more_text?: string
  }
}
