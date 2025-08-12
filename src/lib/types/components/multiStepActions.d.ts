import {
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'
import type { FormState } from 'react-hook-form'

export interface IMultiStepActionsProps {
  step: number
  previousButtonLabel?: string
  nextButtonLabel?: string
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
  totalSteps: number
  formState: FormState
  buttonsOnClick: {
    prev: () => void
    next: () => void
  }
}
