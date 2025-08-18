import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from "../form.d"
import { IWysiwygProps } from "./wysiwyg"

export interface IMoreProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  innerPropsWysiwyg?: IWysiwygProps
  customComponentWysiwyg?: TWebformCustomComponents['wysiwyg']
  moreTitle?: string
}
