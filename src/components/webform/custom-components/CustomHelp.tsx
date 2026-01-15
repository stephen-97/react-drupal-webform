'use client'

import React from 'react'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { HelpProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/help'

const CustomHelp = (props: HelpProps) => {
  return <components.Help {...props} />
}

export default React.memo(CustomHelp)
