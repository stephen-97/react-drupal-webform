import { jsx } from '@emotion/react'
import { IWysiwygProps } from './wysiwyg'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { TElementSource } from './field'

export interface MoreProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  innerPropsWysiwyg?: IWysiwygProps
  components: TWebformCustomComponents
  field: TElementSource
  fieldKey: string
  className?: string
  classNamePrefix: string | undefined | null
  classNames: TWebformClassNames
}
