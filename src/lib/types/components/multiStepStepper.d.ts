import { JSX } from 'react'
import { TWebformCustomComponents } from '@/lib/types/form.d'

export interface IMultiStepStepperProps {
  step: number
  isStepValid: boolean
  components: TWebformCustomComponents
  multiStepTitleAs?: keyof JSX.IntrinsicElements
  currentStepObj: Record<string, any>
}
