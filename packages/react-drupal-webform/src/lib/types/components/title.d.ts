import React, { JSX } from 'react'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { TElementSource } from './field'

type BaseLabelProps = {
  className?: string
  children?: React.ReactNode
  field: TElementSource
  fieldKey: string
  classNames: TWebformClassNames
  classNamePrefix: string | undefined | null
  components: TWebformCustomComponents
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
