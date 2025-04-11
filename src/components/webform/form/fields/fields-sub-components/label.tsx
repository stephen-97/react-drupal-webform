import React from 'react'
import { ILabelWebformProps } from '@/lib/types/components/label'

const Label = ({
  title,
  className,
  children,
  innerProps,
  isRequired,
}: ILabelWebformProps) => {
  return (
    <label className={className} {...innerProps}>
      <span>{title}</span>
      {children}
    </label>
  )
}

export default Label
