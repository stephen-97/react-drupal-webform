'use client'

import React from 'react'
import { MultiStepActionsProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/multiStepActions'
import { components } from '../../../../packages/react-drupal-webform'
const CustomMultiStepActions = (props: MultiStepActionsProps) => {
  return <components.MultiStepActions {...props} />
}

export default React.memo(CustomMultiStepActions)
