import React from 'react'
import styles from '../fieldContainer.module.scss'
import { TWrapperDescriptionWebformProps } from '../../../../../lib/types/components/wrapperDescription'
import cn from 'classnames'
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
