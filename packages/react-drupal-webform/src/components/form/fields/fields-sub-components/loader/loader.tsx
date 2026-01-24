import React from 'react'
import styles from './loader.module.scss'
import cn from 'classnames'
import { LoaderProps } from '../../../../../lib/types/components/loader'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const Loader = (props: LoaderProps) => {
  const { innerProps, className, classNamePrefix } = props

  const loaderClassNames = getClassNames({
    name: 'loader',
    prefix: classNamePrefix,
    baseCn: cn(styles.loader, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'loader',
  })

  return (
    <span className={loaderClassNames} {...dataAttributes} {...innerProps} />
  )
}

export default Loader
