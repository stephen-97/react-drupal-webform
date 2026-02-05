import { DrupalElementCommonNoFieldProps } from '../form'

export interface MultiStepActionsProps extends DrupalElementCommonNoFieldProps {
  previousButtonLabel?: string
  nextButtonLabel?: string
  className?: string
  disableActionButtonWhenInvalid: boolean
}
