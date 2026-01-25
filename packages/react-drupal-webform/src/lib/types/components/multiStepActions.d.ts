import { DrupalElementCommonNoFieldProps } from '../form.d'

export interface MultiStepActionsProps extends DrupalElementCommonNoFieldProps {
  previousButtonLabel?: string
  nextButtonLabel?: string
  className?: string
}
