import { ReactElement } from 'react'
import { FieldValidateProps } from './validate'
import { TFieldWebformObj } from './field'

type TElementFunction = (_props: TFieldWebformObj) => ReactElement | null
type TValidatorFunction = (_props: FieldValidateProps) => void

export interface IFormMappingField {
  [key: string]: {
    element: TElementFunction | null
    validator: TValidatorFunction | null
  }
}
