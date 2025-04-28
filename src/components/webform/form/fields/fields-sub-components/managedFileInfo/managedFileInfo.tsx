import React from 'react'
import { IManagedFileInfoProps } from '@/lib/types/components/managedFileInfo'
import styles from './managedFileInfo.module.scss'
const ManagedFileInfo = ({ field }: IManagedFileInfoProps) => {
  console.log('test')
  return (
    <div className={styles.managedFileInfo}>
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
