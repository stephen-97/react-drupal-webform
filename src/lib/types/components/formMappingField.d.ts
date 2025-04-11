import { Control } from 'react-hook-form'
import { FocusEventHandler, ReactElement } from 'react'
import {
  TWebformClassNames,
  TWebformCustomComponents,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { TElementSource, TFieldValidate } from '@/lib/types/field'

type TElementFunction = (_props: TFieldObj) => ReactElement | null
type TValidatorFunction = (_props: TFieldValidate) => void

export interface IFormMappingField {
  [key: string]: {
    element: TElementFunction | null
    validator: TValidatorFunction | null
  }
}
