import React from 'react'
import { TWebformCustomComponents } from '@/lib/types/form.d'

export interface IMultiStepActionsProps {
  step: number
  previousButtonLabel?: string
  nextButtonLabel?: string
  isStepValid: boolean
  goPrev: React.MouseEventHandler<HTMLButtonElement>
  components: TWebformCustomComponents
}
