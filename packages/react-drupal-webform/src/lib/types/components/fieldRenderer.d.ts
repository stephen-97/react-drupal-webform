import { TFieldWebformObj } from './field'
import { ILayoutWrapperProps } from './layoutWrapper'
import { TFieldWebformObjCustom } from './fieldWebformObjCustom'

export type TFieldRendererProps =
  | TFieldWebformObj
  | TFieldWebformObjCustom
  | ILayoutWrapperProps
