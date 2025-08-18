import React, { ReactNode } from 'react'
import { IWysiwygProps } from "../../../../lib/types/components/wysiwyg"

type TFieldWysiwygCustom = IWysiwygProps & {
  children: ReactNode
}
const FieldWysiwygCustom = (props: TFieldWysiwygCustom) => {
  return <>{props.children}</>
}

export type { TFieldWysiwygCustom }
export default FieldWysiwygCustom
