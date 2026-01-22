'use client'

import React from 'react'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { FieldContainerProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/fieldContainer'

const CustomWrapper = (props: FieldContainerProps) => {
  return (
    <components.FieldContainer {...props}>
      {props.children}
    </components.FieldContainer>
  )
}

export default React.memo(CustomWrapper)
