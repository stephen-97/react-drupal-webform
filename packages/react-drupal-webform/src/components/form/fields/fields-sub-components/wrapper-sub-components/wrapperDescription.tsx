import React from 'react'
import { WrapperDescriptionProps } from '../../../../../lib/types/components/wrapperDescription'
import Description from '../description/description'

const WrapperDescription = ({
  components,
  classNames,
  field,
  fieldKey,
  classNamePrefix,
}: WrapperDescriptionProps) => {
  const CustomDescription = components?.description ?? Description

  return (
    <CustomDescription
      components={components}
      classNames={classNames}
      field={field}
      classNamePrefix={classNamePrefix}
      fieldKey={fieldKey}
    />
  )
}

export default React.memo(WrapperDescription)
