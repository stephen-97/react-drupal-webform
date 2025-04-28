import React from 'react'
import { IManagedFileInfoProps } from '@/lib/types/components/managedFileInfo'
import styles from './managedFileInfo.module.scss'
import cn from 'classnames'
const ManagedFileInfo = ({ field, innerProps }: IManagedFileInfoProps) => {
  return (
    <div className={cn(styles.managedFileInfo, innerProps?.className)}>
      <span className={styles.label}>One file limit</span>
      {field?.['#max_filesize'] && (
        <span className={styles.label}>{field['#max_filesize']} MB limit</span>
      )}
      {field?.['#file_extensions'] && (
        <span className={styles.label}>
          Allowed types: {field['#file_extensions']}
        </span>
      )}
    </div>
  )
}

export default ManagedFileInfo
