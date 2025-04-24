import React, { ReactNode } from 'react'
import { TFieldObj } from '@/lib/types/components/field'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

type TFieldObjCustom = Omit<TFieldObj, 'key'> & {
  fieldController: ControllerRenderProps<any, string>
  fieldState: ControllerFieldState
  children?: ReactNode
  key?: string
}
const FieldObjCustom = (props: TFieldObjCustom) => {
  return <>{props.children}</>
}

export type { TFieldObjCustom }
export default FieldObjCustom
