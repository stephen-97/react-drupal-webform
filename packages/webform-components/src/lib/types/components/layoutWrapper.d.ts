import { TFieldWebformObj } from './field'
import React from 'react'

export interface ILayoutWrapperProps extends TFieldWebformObj {
  children: React.ReactNode
  fieldKey: string
}
