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
      innerRef?: (instance: HTMLLabelElement | null) => void
    })
  | (BaseLabelProps & {
      wrapperElement: 'legend'
      innerProps?: JSX.IntrinsicElements['legend']
      innerRef?: (instance: HTMLLegendElement | null) => void
    })
