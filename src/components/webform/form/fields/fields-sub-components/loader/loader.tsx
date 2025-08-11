import React from 'react'
import styles from './loader.module.scss'
import cn from 'classnames'
import { ILaoderWebformProps } from '@/lib/types/components/loader'

const Loader = (props: ILaoderWebformProps) => {
  const { innerProps } = props
  return <span className={cn(styles.loader, innerProps?.className)} />
}

export default Loader
