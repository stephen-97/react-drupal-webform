import styles from './managedFilePreview.module.scss'
import { IManagedFilePreviewWebformProps } from "../../../../../lib/types/components/filePreview"
import React from 'react'
import { TFileWithBase64 } from "../../../../../lib/types/form.d"
import { base64ToBlob } from "../../../../../lib/functions/webform_fields_functions/webform_fields_file_functions"
import cn from 'classnames'
import Button from "../buttons/button/button"

const ManagedFilePreview = ({
  innerProps,
  value,
  handleRemove,
}: IManagedFilePreviewWebformProps) => {
  const { className, ...restInnerProps } = innerProps ?? {}

  const fileValue = value as TFileWithBase64
  const blob = base64ToBlob(fileValue.base64, fileValue.type)

  return (
    <div className={cn(styles.filePreview, className)} {...restInnerProps}>
      <div className={styles.fileInfo}>
        <span className={styles.fileName}>
          <a
            className={styles.link}
            href={URL.createObjectURL(blob)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fileValue?.name}
          </a>
        </span>
        <span className={styles.fileSize}>
          ({(fileValue?.size / 1024).toFixed(2)} KB)
        </span>
      </div>
      <Button
        fillType={'border'}
        size={'small'}
        title={'Remove'}
        innerProps={{ onClick: () => handleRemove() }}
      />
    </div>
  )
}

export default ManagedFilePreview
