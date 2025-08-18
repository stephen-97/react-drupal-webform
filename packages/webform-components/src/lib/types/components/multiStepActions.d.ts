import {
  TWebformClassNames,
  TWebformCustomComponents,
} from "../form.d"
import type { FormState } from 'react-hook-form'

export interface IMultiStepActionsProps {
  previousButtonLabel?: string
  nextButtonLabel?: string
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
}
