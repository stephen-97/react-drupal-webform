import { TElementSource } from './field'
import { TWebformValueFormat } from '../form.d'
import { TDeepRequiredClassNames } from '../deepRequired'

export interface IFieldRendererWebformProps {
  index: number
  fieldKey: string
  field: TElementSource
  valueFormat: Required<TWebformValueFormat>
  components?: any
  classNames: TDeepRequiredClassNames
  isMultiStep: boolean
  watchedValues?: Record<string, any>
}
