import React, { JSX } from 'react'
import { TWebformCustomComponents } from "../form.d"
import { IHelpProps } from "./help"

export type ILabelWebformProps =
  | {
      wrapperElement: 'label'
      title?: string
      children?: React.ReactNode
      innerProps?: JSX.IntrinsicElements['label']
      custom_component_help?: TWebformCustomComponents['help']
      isRequired?: boolean
      innerPropsHelpComponent: IHelpProps
    }
  | {
      wrapperElement: 'legend'
      title?: string
      children?: React.ReactNode
      innerProps?: JSX.IntrinsicElements['legend']
      custom_component_help?: TWebformCustomComponents['help']
      isRequired?: boolean
      innerPropsHelpComponent: IHelpProps
    }
