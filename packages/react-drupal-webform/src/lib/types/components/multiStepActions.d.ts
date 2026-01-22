import { TWebformClassNames, TWebformCustomComponents } from '../form.d'

export interface MultiStepActionsProps {
  previousButtonLabel?: string
  nextButtonLabel?: string
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
  className?: string
  classNamePrefix: string
}
