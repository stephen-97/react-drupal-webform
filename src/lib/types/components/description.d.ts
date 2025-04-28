import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from '@/lib/types/form.d'

export interface IDescriptionProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  custom_component_wysiwyg?: TWebformCustomComponents['wysiwyg']
  processed: string
}
