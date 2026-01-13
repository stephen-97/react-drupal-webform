'use client'

import React from 'react'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { WrapperProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/wrapper'

const CustomWrapper = (props: WrapperProps) => {
  return <components.Wrapper {...props}>{props.children}</components.Wrapper>
}

export default React.memo(CustomWrapper)
