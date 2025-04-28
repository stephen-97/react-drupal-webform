'use client'

import React, { useState } from 'react'
import styles from './more.module.scss'
import { IMoreProps } from '@/lib/types/components/more'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiwyg/wysiwyg'
import cn from 'classnames'

const More = ({
  innerPropsContainer,
  innerPropsButton,
  more,
  custom_component_wysiwyg,
}: IMoreProps) => {
  const CustomWysiwyg = custom_component_wysiwyg ?? Wysiwyg
  const { className: containerClassName, ...containerProps } =
    innerPropsContainer ?? {}
  const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {}

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div className={cn(styles.more, containerClassName)} {...containerProps}>
      <button
        className={cn(styles.button, buttonClassName, {
          [styles.opened]: open,
        })}
        onClick={handleClick}
        {...buttonProps}
      >
        {more?.more_title}
      </button>
      {open && more?.processed_more_text && (
        <CustomWysiwyg processed={more?.processed_more_text} as={'div'} />
      )}
    </div>
  )
}

export default React.memo(More)
