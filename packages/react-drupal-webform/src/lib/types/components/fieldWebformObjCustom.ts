import { ReactNode } from 'react'
import { TFieldWebformObj } from './field'

export type FieldWebformObjCustomProps = Omit<TFieldWebformObj, 'key'> & {
  fieldKey: string
  children?: ReactNode
  key?: string
}
