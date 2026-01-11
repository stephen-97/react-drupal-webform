import React, { JSX } from 'react'
import { TWebformCustomComponents } from '../form.d'
import { IHelpProps } from './help'
import { TElementSource } from './field'

export type ILabelWebformProps =
  | {
      wrapperElement: 'label'
      field?: TElementSource
      fieldKey?: string
      children?: React.ReactNode
      innerProps?: JSX.IntrinsicElements['label']
      components?: TWebformCustomComponents
      innerPropsHelpComponent: IHelpProps
    }
  | {
      wrapperElement: 'legend'
      children?: React.ReactNode
      field?: TElementSource
      fieldKey?: string
      innerProps?: JSX.IntrinsicElements['legend']
      components?: TWebformCustomComponents
      innerPropsHelpComponent: IHelpProps
    }
