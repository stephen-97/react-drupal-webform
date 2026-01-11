import { TElementSource } from './field'
import { TWebformClassNames, TWebformCustomComponents } from '../form.d'

export type TWrapperLabelWebformProps = {
  components: TWebformCustomComponents
  classNames: Required<TWebformClassNames>
  className?: string
  field: TElementSource
  fieldKey: string
}
