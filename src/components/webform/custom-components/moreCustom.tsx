import React from 'react'
import { IMoreProps } from '@/lib/types/components/more'

const MoreCustom = ({ ...props }: IMoreProps) => {
  return <div>{props.more?.more_title}</div>
}
export default MoreCustom
