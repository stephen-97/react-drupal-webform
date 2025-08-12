import { TElementSource } from '@/lib/types/components/field'
import type { FormState } from 'react-hook-form'
import { TWebformValueFormat } from '@/lib/types/form.d'
import { TDeepRequiredClassNames } from '@/lib/types/deepRequired'

export interface IFieldRendererWebformProps {
  control: any
  index: number
  fieldKey: string
  field: TElementSource
  formState: FormState<any>
  valueFormat: Required<TWebformValueFormat>
  components?: any
  classNames: TDeepRequiredClassNames
  isMultiStep: boolean
}
