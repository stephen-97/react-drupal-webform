import React from 'react'
import styles from './loader.module.scss'
import cn from 'classnames'
import { LoaderProps } from '../../../../../lib/types/components/loader'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const Loader = (props: LoaderProps) => {
  const { innerProps, className, classNamePrefix, unstyled, innerRef } = props

  const loaderClassNames = getClassNames({
    name: 'loader',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.loader),
  })

  const dataAttributes = getDataAttributes({
    component: 'loader',
  })

  return (
    <span
      ref={innerRef}
      className={loaderClassNames}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default Loader
