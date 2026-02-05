import { jsx } from '@emotion/react'
import { WysiwygProps } from './wysiwyg'
import { DrupalElementCommonProps } from '../form'

export interface MoreProps extends DrupalElementCommonProps {
  innerPropsContainer?: jsx.JSX.IntrinsicElements['div']
  innerPropsButton?: jsx.JSX.IntrinsicElements['button']
  innerPropsWysiwyg?: WysiwygProps
  className?: string
  innerRef?: (instance: HTMLDivElement | null) => void
}
