import { TFieldWebformObj } from './field'
import { LayoutProps } from './layout'
import { FieldWebformObjCustomProps } from './fieldWebformObjCustom'

export type TFieldRendererProps =
  | TFieldWebformObj
  | FieldWebformObjCustomProps
  | LayoutProps
