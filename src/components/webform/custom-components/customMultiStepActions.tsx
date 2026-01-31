'use client'

import React from 'react'
import { MultiStepActionsProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/multiStepActions'
import MultiStepActions from '../../../../packages/react-drupal-webform/src/components/form/formMultiStep/multiStepActions/multiStepActions'

const CustomMultiStepActions = (props: MultiStepActionsProps) => {
  return <MultiStepActions {...props} />
}

export default React.memo(CustomMultiStepActions)
