import React from 'react'
import { ILabelWebformProps } from '@/lib/types/components/label'
import Help from '@/components/webform/form/fields/fields-sub-components/help/help'

const Label = ({
  title,
  className,
  children,
  innerProps,
  isRequired,
  helps,
}: ILabelWebformProps) => {
  return (
    <label className={className} {...innerProps}>
      {title && <span>{title}</span>}
      {((helps?.help?.length ?? 0) > 0 ||
        (helps?.processed_help_title?.length ?? 0) > 0) && (
        <Help helps={helps} />
      )}
    </label>
  )
}

export default Label
