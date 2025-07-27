import {
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'

export interface IMultiStepActionsProps {
  step: number
  previousButtonLabel?: string
  nextButtonLabel?: string
  isStepValid: boolean
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
  totalSteps: number
  buttonsOnClick: {
    prev: () => void
    next: () => void
  }
}
