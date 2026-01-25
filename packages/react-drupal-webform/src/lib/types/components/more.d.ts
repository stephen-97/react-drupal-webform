import { jsx } from '@emotion/react'
import { IWysiwygProps } from './wysiwyg'
import { DrupalElementCommonProps } from '../form.d'

export interface MoreProps extends DrupalElementCommonProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  innerPropsWysiwyg?: IWysiwygProps
  className?: string
}
