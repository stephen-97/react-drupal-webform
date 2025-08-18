'use client'

import React, { useState } from 'react'
import styles from './more.module.scss'
import { IMoreProps } from "../../../../../lib/types/components/more"
import Wysiwyg from "../../fields-special-components/wysiwyg/wysiwyg"
import cn from 'classnames'

const More = ({
  innerPropsContainer,
  innerPropsButton,
  innerPropsWysiwyg,
  moreTitle,
  customComponentWysiwyg,
}: IMoreProps) => {
  const CustomWysiwyg = customComponentWysiwyg ?? Wysiwyg
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
        type="button"
        className={cn(styles.button, buttonClassName, {
          [styles.opened]: open,
        })}
        onClick={handleClick}
        {...buttonProps}
      >
        {moreTitle}
      </button>
      {open && innerPropsWysiwyg?.processed && (
        <CustomWysiwyg as={'div'} {...innerPropsWysiwyg} />
      )}
    </div>
  )
}

export default React.memo(More)
