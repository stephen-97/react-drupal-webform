import { jsx } from '@emotion/react'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { TElementSource } from './field'

export interface DescriptionProps {
  innerProps?: jsx.JSX.IntrinsicElements['div']
  field: TElementSource
  components: TWebformCustomComponents
  classNames: TWebformClassNames
  className?: string
}
