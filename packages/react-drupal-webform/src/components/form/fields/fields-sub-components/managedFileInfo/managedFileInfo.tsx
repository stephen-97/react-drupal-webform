import React from 'react'
import cn from 'classnames'
import styles from './managedFileInfo.module.scss'
import { ManagedFileInfoProps } from '../../../../../lib/types/components/managedFileInfo'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const ManagedFileInfo = ({
  field,
  innerProps,
  className,
  classNamePrefix,
}: ManagedFileInfoProps) => {
  const wrapperClassNames = getClassNames({
    name: 'managedFileInfo',
    prefix: classNamePrefix,
    baseCn: cn(styles.managedFileInfo, className),
  })

  const labelClassNames = getClassNames({
    name: 'managedFileLabel',
    prefix: classNamePrefix,
    baseCn: cn(styles.label),
  })

  const maxSizeClassNames = getClassNames({
    name: 'managedFileInfoMaxSize',
    prefix: classNamePrefix,
    baseCn: cn(styles.label),
  })

  const fileExtensionClassname = getClassNames({
    name: 'managedFileFileExtension',
    prefix: classNamePrefix,
    baseCn: cn(styles.label),
  })

  const dataAttributes = getDataAttributes({
    component: 'managedFileInfo',
    type: 'managed_file',
  })

  return (
    <div className={wrapperClassNames} {...dataAttributes} {...innerProps}>
      <span className={labelClassNames}>One file limit</span>

      {field?.['#max_filesize'] && (
        <span className={maxSizeClassNames}>
          {field['#max_filesize']} MB limit
        </span>
      )}

      {field?.['#file_extensions'] && (
        <span className={fileExtensionClassname}>
          Allowed types: {field['#file_extensions']}
        </span>
      )}
    </div>
  )
}

export default React.memo(ManagedFileInfo)
