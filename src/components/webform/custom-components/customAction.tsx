'use client'

import React from 'react'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { ActionProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/action'

const CustomAction = (props: ActionProps) => {
  return <components.Action {...props} />
}

export default React.memo(CustomAction)
