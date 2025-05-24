import React, { JSX } from 'react'
import { TWebformCustomComponents } from '@/lib/types/form.d'
import { IHelpProps } from '@/lib/types/components/help'

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
