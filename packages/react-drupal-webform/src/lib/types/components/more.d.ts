import { jsx } from '@emotion/react'
import { IWysiwygProps } from './wysiwyg'
import { TWebformCustomComponents } from '../form.d'

export interface MoreProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  innerPropsWysiwyg?: IWysiwygProps
  components: TWebformCustomComponents
  moreTitle?: string
}
