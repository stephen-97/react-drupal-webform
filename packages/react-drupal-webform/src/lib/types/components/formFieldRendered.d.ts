import { TElementSource } from './field'
import { TDeepRequiredClassNames } from '../deepRequired'

export interface IFieldRendererWebformProps {
  index: number
  fieldKey: string
  field: TElementSource
  components?: any
  classNames: TDeepRequiredClassNames
  classNamePrefix?: string
  isMultiStep: boolean
  watchedValues?: Record<string, any>
}
