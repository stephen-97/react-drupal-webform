import React from 'react'
import {
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'

export interface IMultiStepActionsProps {
  step: number
  previousButtonLabel?: string
  nextButtonLabel?: string
  isStepValid: boolean
  goPrev: React.MouseEventHandler<HTMLButtonElement>
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
  totalSteps: number
}
