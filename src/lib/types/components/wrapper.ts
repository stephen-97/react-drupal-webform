import { ReactElement } from 'react'
import {
  TWebformClassNameFields,
  TWebformClassNames,
  TWebformCustomComponents,
} from '@/lib/types/form.d'
import { FieldError } from 'react-hook-form'
import { TElementSource } from '@/lib/types/components/field'

export interface IWrapperWebformProps {
  children: ReactElement
  isLabel?: boolean
  className?: string
  field: TElementSource
  classNames: Required<TWebformClassNames>
  classNameFieldName: keyof Required<TWebformClassNameFields>
  stateError?: FieldError | undefined
  components: TWebformCustomComponents
}
