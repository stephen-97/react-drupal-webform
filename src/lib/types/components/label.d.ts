import React from 'react'
import { jsx } from '@emotion/react'
import { TWebformCustomComponents } from '@/lib/types/form.d'
import { IHelpProps } from '@/lib/types/components/help'

export interface ILabelWebformProps {
  title?: string
  children?: React.ReactNode
  innerProps?: jsx.JSX.IntrinsicElements['div']
  custom_component_help?: TWebformCustomComponents['help']
  isRequired?: boolean
  innerPropsHelpComponent: IHelpProps
}
