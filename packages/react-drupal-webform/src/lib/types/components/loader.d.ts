import { jsx } from '@emotion/react'

export interface LoaderProps {
  innerProps?: jsx.JSX.IntrinsicElements['span']
  classNamePrefix: string | undefined | null
  className?: string
}
