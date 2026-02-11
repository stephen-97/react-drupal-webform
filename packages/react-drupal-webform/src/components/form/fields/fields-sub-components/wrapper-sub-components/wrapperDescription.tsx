import React from 'react'
import { WrapperDescriptionProps } from '../../../../../lib/types/components/wrapperDescription'
import Description from '../description/description'

const WrapperDescription = ({
  components,
  field,
  fieldKey,
  classNamePrefix,
  unstyled,
}: WrapperDescriptionProps) => {
  const CustomDescription = components?.description ?? Description

  return (
    <CustomDescription
      unstyled={unstyled}
      components={components}
      field={field}
      classNamePrefix={classNamePrefix}
      fieldKey={fieldKey}
    />
  )
}

export default React.memo(WrapperDescription)
