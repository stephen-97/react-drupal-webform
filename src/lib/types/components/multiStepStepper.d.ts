import { JSX } from 'react'
import {
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'

export interface IMultiStepStepperProps {
  step: number
  totalSteps: number
  isStepValid: boolean
  components: TWebformCustomComponents
  multiStepTitleAs?: keyof JSX.IntrinsicElements
  currentStepObj: Record<string, any>
  classNames: Required<TWebformClassNames>
}
