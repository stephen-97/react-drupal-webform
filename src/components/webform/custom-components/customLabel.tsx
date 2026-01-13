'use client'

import React from 'react'
import { TitleProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/title'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'

const CustomLabel = (props: TitleProps) => {
  return <components.Title {...props} />
}

export default React.memo(CustomLabel)
