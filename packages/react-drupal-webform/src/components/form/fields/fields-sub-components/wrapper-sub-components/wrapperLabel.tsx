import React from 'react'
import Label from '../label/label'
import { TWrapperLabelWebformProps } from '../../../../../lib/types/components/wrapperLabel'

const WrapperLabel = ({
  components,
  classNames,
  field,
  fieldKey,
}: TWrapperLabelWebformProps) => {
  const CustomLabel = components?.label ?? Label

  const wrapperElement =
    field?.['#type'] === 'checkboxes' || field?.['#type'] === 'radios'
      ? 'legend'
      : 'label'

  return (
    <CustomLabel
      wrapperElement={wrapperElement}
      fieldKey={fieldKey}
      components={components}
      classNames={classNames}
      field={field}
    />
  )
}

export default React.memo(WrapperLabel)
