import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from '@/lib/types/form.d'

export interface IMoreProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  custom_component_wysiwyg?: TWebformCustomComponents['wysiwyg']
  more?: {
    more_title?: string
    processed_more_text?: string
  }
}
