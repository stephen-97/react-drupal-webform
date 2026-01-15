'use client'

import React, { useState } from 'react'
import cn from 'classnames'
import styles from './customMore.module.scss'
import { MoreProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/more'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'

const CustomMore = (props: MoreProps) => {
  const {
    innerPropsContainer,
    innerPropsButton,
    innerPropsWysiwyg,
    moreTitle,
  } = props
  const { className: containerClassName, ...containerProps } =
    innerPropsContainer ?? {}

  const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {}

  const [open, setOpen] = useState(false)

  return <components.More {...props} />
}

export default React.memo(CustomMore)
