import { TWebformClassNames, TWebformCustomComponents } from '../form.d'

export interface IMultiStepActionsProps {
  previousButtonLabel?: string
  nextButtonLabel?: string
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
}
