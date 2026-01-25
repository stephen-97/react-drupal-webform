import React, { JSX } from 'react'
import { DrupalElementCommonProps } from '../form.d'

type BaseLabelProps = DrupalElementCommonProps & {
  className?: string
  children?: React.ReactNode
}

export type TitleProps =
  | (BaseLabelProps & {
      wrapperElement: 'label'
      innerProps?: JSX.IntrinsicElements['label']
    })
  | (BaseLabelProps & {
      wrapperElement: 'legend'
      innerProps?: JSX.IntrinsicElements['legend']
    })
