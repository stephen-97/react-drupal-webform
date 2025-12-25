import { TElementSource } from "./field"
import {
  TWebformClassNames,
  TWebformCustomComponents,
} from "../form.d"
import { ILabelWebformProps } from "./label"

export type TWrapperLabelWebformProps = {
  components: TWebformCustomComponents
  innerPropsLabelComponent?: Partial<ILabelWebformProps>
  classNames: Required<TWebformClassNames>
  field: TElementSource
  fieldKey: string
}
