import { jsx } from '@emotion/react'
import { IWysiwygProps } from './wysiwyg'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'

export interface MoreProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  innerPropsWysiwyg?: IWysiwygProps
  components: TWebformCustomComponents
  className?: string
  classNames: TWebformClassNames
  moreTitle?: string
}
