import { TElementSource } from './field'

export interface IFieldRendererWebformProps {
  index: number
  fieldKey: string
  field: TElementSource
  components?: any
  classNamePrefix: string | undefined | null
  isMultiStep: boolean
  watchedValues?: Record<string, any>
  unstyled: boolean
  disableActionButtonWhenInvalid: boolean
  validationEngine: 'rhf' | 'html'
}
