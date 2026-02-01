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
  components,
  className,
  classNamePrefix,
  field,
  unstyled,
}: MoreProps) => {
  const CustomWysiwyg = components.wysiwyg ?? Wysiwyg

  const { className: containerClassName, ...containerProps } =
    innerPropsContainer ?? {}
  const { className: buttonClassName, ...buttonProps } = innerPropsButton ?? {}

  const [open, setOpen] = useState(false)

  const containerClassNames = getClassNames({
    name: 'more',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.more, containerClassName),
  })

  const buttonClassNames = getClassNames({
    name: 'moreButton',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(styles.button, buttonClassName, {
      [styles.opened]: open,
    }),
  })

  const buttonLabelClassNames = getClassNames({
    name: 'moreButtonLabel',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(styles.buttonLabel),
  })

  const wysiwygClassNames = getClassNames({
    name: 'moreContent',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(styles.moreWysiwyg),
  })

  const dataAttributes = getDataAttributes({
    component: 'more',
  })

  const moreTitle = field?.['#more_title']
  const moreText = field?.['#more']

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
        aria-expanded={open}
        {...buttonProps}
      >
        <span className={buttonLabelClassNames}>{moreTitle ?? 'More'}</span>
      </button>

      {open && moreText && moreText.length > 0 && (
        <CustomWysiwyg
          as="div"
          className={wysiwygClassNames}
          classNamePrefix={classNamePrefix}
          processed={moreText}
          source={'more'}
          {...innerPropsWysiwyg}
        />
      )}
    </div>
  )
}

export default React.memo(More)
