'use client'

import React, { useState } from 'react'
import cn from 'classnames'
import styles from './customMore.module.scss'
import { IMoreProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/more'

const CustomMore = ({
  innerPropsContainer,
  innerPropsButton,
  innerPropsWysiwyg,
  moreTitle,
}: IMoreProps) => {
  const { className: containerClassName, ...containerProps } =
    innerPropsContainer ?? {}

  const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {}

  const [open, setOpen] = useState(false)

  return (
    <div className={cn(styles.more, containerClassName)} {...containerProps}>
      <button
        type="button"
        className={cn(styles.button, buttonClassName, {
          [styles.opened]: open,
        })}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        {...buttonProps}
      >
        <span className={styles.title}>{moreTitle}</span>
        <span className={styles.icon} />
      </button>

      <div
        className={cn(styles.content, { [styles.opened]: open })}
        aria-hidden={!open}
      >
        {innerPropsWysiwyg?.processed && (
          <div
            className={styles.htmlContent}
            dangerouslySetInnerHTML={{
              __html: innerPropsWysiwyg.processed,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(CustomMore)
