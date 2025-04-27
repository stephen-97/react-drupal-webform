'use client'

import React, { useState } from 'react'
import styles from './more.module.scss'
import { IMoreProps } from '@/lib/types/components/more'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiyg'
import cn from 'classnames'

const More = ({ innerPropsContainer, innerPropsButton, more }: IMoreProps) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div {...innerPropsContainer}>
      <button
        className={cn(styles.button, innerPropsButton?.className, {
          [styles.opened]: open,
        })}
        onClick={handleClick}
        {...innerPropsButton}
      >
        {more?.more_title}
      </button>
      {open && more?.processed_more_text && (
        <Wysiwyg processed={more?.processed_more_text} as={'div'} />
      )}
    </div>
  )
}

export default React.memo(More)
