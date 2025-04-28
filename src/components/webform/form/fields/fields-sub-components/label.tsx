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
  custom_component_wysiwyg,
  custom_component_help,
}: ILabelWebformProps) => {
  const CustomHelp = custom_component_help ?? Help

  return (
    <label className={className} {...innerProps}>
      {title && <span>{title}</span>}
      {((helps?.help?.length ?? 0) > 0 ||
        (helps?.processed_help_title?.length ?? 0) > 0) && (
        <CustomHelp
          helps={helps}
          custom_component_wysiwyg={custom_component_wysiwyg}
        />
      )}
    </label>
  )
}

export default Label
