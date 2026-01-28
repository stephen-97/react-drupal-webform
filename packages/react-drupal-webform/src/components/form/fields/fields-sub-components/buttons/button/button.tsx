import React from 'react'
import styles from './button.module.scss'
import { ButtonProps } from '../../../../../../lib/types/components/button'
import cn from 'classnames'
import { getClassNames } from '../../../../../../lib/functions/utils_functions'

const Button = ({
  title,
  innerProps,
  fillType = 'fill',
  size = 'default',
  className,
  classNamePrefix,
  unstyled,
}: ButtonProps) => {
  const { ...restInnerProps } = innerProps ?? {}

  const buttonClassNames = getClassNames({
    name: 'button',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.button, styles[fillType], styles[size]),
  })

  return (
    <button className={buttonClassNames} type={'button'} {...restInnerProps}>
      {title}
    </button>
  )
}

export default Button
