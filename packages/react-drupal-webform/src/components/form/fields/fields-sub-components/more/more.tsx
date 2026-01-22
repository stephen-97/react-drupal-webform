import React, { useState } from 'react'
import cn from 'classnames'
import styles from './more.module.scss'
import { MoreProps } from '../../../../../lib/types/components/more'
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg'
import { getClassNames } from '../../../../../lib/functions/utils_functions'
import { getDataAttributes } from '../../../../../lib/functions/utils_functions'

const More = ({
  innerPropsContainer,
  innerPropsButton,
  innerPropsWysiwyg,
  moreTitle,
  components,
  className,
}: MoreProps) => {
  const CustomWysiwyg = components.wysiwyg ?? Wysiwyg

  const { className: containerClassName, ...containerProps } =
    innerPropsContainer ?? {}
  const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {}

  const [open, setOpen] = useState(false)

  const containerClassNames = getClassNames({
    name: 'more',
    baseCn: cn(styles.more, containerClassName, className),
  })

  const buttonClassNames = getClassNames({
    name: 'moreButton',
    baseCn: cn(styles.button, buttonClassName, {
      [styles.opened]: open,
    }),
  })

  const wysiwygClassNames = getClassNames({
    name: 'moreContent',
    baseCn: cn(styles.moreWysiwyg),
  })

  const dataAttributes = getDataAttributes({
    component: 'more',
  })

  return (
    <div
      className={containerClassNames}
      {...dataAttributes}
      {...containerProps}
    >
      <button
        type="button"
        className={buttonClassNames}
        onClick={() => setOpen((prev) => !prev)}
        {...buttonProps}
      >
        {moreTitle}
      </button>

      {open && innerPropsWysiwyg?.processed && (
        <CustomWysiwyg
          as="div"
          className={wysiwygClassNames}
          {...innerPropsWysiwyg}
        />
      )}
    </div>
  )
}

export default React.memo(More)
