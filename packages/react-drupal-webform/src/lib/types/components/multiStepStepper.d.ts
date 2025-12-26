import { JSX } from 'react'
import {
  TWebformClassNames,
  TWebformCustomComponents,
} from "../form.d"

export interface IMultiStepStepperProps {
  components: TWebformCustomComponents
  multiStepTitleAs?: keyof JSX.IntrinsicElements
  currentStepObj: Record<string, any>
  classNames: Required<TWebformClassNames>
}