import React from 'react'
import styles from './button.module.scss'
import { IButtonWebformProps } from '@/lib/types/components/button'
import cn from 'classnames'

const Button = ({
  title,
  innerProps,
  fillType = 'fill',
  size = 'default',
}: IButtonWebformProps) => {
  const { className, ...restInnerProps } = innerProps ?? {}

  return (
    <button
      className={cn(className, styles.button, styles[fillType], styles[size])}
      type={'button'}
      {...restInnerProps}
    >
      {title}
    </button>
  )
}

export default Button
