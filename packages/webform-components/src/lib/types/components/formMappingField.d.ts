import { ReactElement } from 'react'
import { TFieldValidate } from './validate'
import { TFieldWebformObj } from './field'

type TElementFunction = (_props: TFieldWebformObj) => ReactElement | null
type TValidatorFunction = (_props: TFieldValidate) => void

export interface IFormMappingField {
  [key: string]: {
    element: TElementFunction | null
    validator: TValidatorFunction | null
  }
}
