import { TElementSource } from '@/lib/types/components/field'
import {
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'
import { ILabelWebformProps } from '@/lib/types/components/label'

export type TWrapperLabelWebformProps = {
  components: TWebformCustomComponents
  innerPropsLabelComponent?: Partial<ILabelWebformProps>
  classNames: Required<TWebformClassNames>
  field: TElementSource
  fieldKey: string
}
