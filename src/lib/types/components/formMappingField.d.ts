import { ReactElement } from 'react'

import { TFieldValidate } from '@/lib/types/field'

type TElementFunction = (_props: TFieldObj) => ReactElement | null
type TValidatorFunction = (_props: TFieldValidate) => void

export interface IFormMappingField {
  [key: string]: {
    element: TElementFunction | null
    validator: TValidatorFunction | null
  }
}
