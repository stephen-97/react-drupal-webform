import React from 'react'
import { TWrapperDescriptionWebformProps } from '../../../../../lib/types/components/wrapperDescription'
import Description from '../description/description'

const WrapperDescription = ({
  components,
  classNames,
  field,
}: TWrapperDescriptionWebformProps) => {
  const CustomDescription = components?.description ?? Description

  return (
    <CustomDescription
      components={components}
      classNames={classNames}
      field={field}
    />
  )
}

export default React.memo(WrapperDescription)
