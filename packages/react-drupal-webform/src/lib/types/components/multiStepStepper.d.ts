import { JSX } from 'react'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'
import { jsx } from '@emotion/react'

export interface MultiStepStepperProps {
  components: TWebformCustomComponents
  multiStepTitleAs?: keyof JSX.IntrinsicElements
  currentStepObj: Record<string, any>
  elementsSource: Record<string, any>
  classNames: Required<TWebformClassNames>
  classNamePrefix: string | undefined | null
  innerProps?: jsx.JSX.IntrinsicElements['div']
  className?: string
  unstyled: boolean
}
