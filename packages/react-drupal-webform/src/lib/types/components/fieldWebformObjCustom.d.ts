import { ReactNode } from 'react'
import { TFieldWebformObj } from './field'

export type TFieldWebformObjCustom = Omit<TFieldWebformObj, 'key'> & {
  fieldKey: string
  children?: ReactNode
  key?: string
}
