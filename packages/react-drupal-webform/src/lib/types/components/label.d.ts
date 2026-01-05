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
      custom_component_help?: TWebformCustomComponents['help']
      innerPropsHelpComponent: IHelpProps
    }
  | {
      wrapperElement: 'legend'
      children?: React.ReactNode
      field?: TElementSource
      fieldKey?: string
      innerProps?: JSX.IntrinsicElements['legend']
      custom_component_help?: TWebformCustomComponents['help']
      innerPropsHelpComponent: IHelpProps
    }
