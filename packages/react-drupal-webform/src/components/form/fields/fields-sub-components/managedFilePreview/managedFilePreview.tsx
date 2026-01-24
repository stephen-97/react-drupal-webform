import React from 'react'
import cn from 'classnames'
import styles from './managedFilePreview.module.scss'
import { ManagedFilePreviewProps } from '../../../../../lib/types/components/filePreview'
import { TFileWithBase64 } from '../../../../../lib/types/form.d'
import { base64ToBlob } from '../../../../../lib/functions/webform_fields_functions/webform_fields_file_functions'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'
import Button from '../buttons/button/button'

const ManagedFilePreview = ({
  innerProps,
  value,
  handleRemove,
  className,
  classNamePrefix,
  field,
  fieldKey,
}: ManagedFilePreviewProps) => {
  const fileValue = value as TFileWithBase64
  const blob = base64ToBlob(fileValue.base64, fileValue.type)

  const wrapperClassNames = getClassNames({
    name: 'managedFilePreview',
    prefix: classNamePrefix,
    baseCn: cn(styles.filePreview, className),
  })

  const fileInfoClassNames = getClassNames({
    name: 'managedFilePreviewInfo',
    prefix: classNamePrefix,
    baseCn: styles.fileInfo,
  })

  const fileNameClassNames = getClassNames({
    name: 'managedFilePreviewName',
    prefix: classNamePrefix,
    baseCn: styles.fileName,
  })

  const fileLinkClassNames = getClassNames({
    name: 'managedFilePreviewLink',
    prefix: classNamePrefix,
    baseCn: styles.link,
  })

  const fileSizeClassNames = getClassNames({
    name: 'managedFilePreviewSize',
    prefix: classNamePrefix,
    baseCn: styles.fileSize,
  })

  const dataAttributes = getDataAttributes({
    component: 'managedFilePreview',
  })

  return (
    <div className={wrapperClassNames} {...dataAttributes} {...innerProps}>
      <div className={fileInfoClassNames}>
        <span className={fileNameClassNames}>
          <a
            className={fileLinkClassNames}
            href={URL.createObjectURL(blob)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fileValue?.name}
          </a>
        </span>

        <span className={fileSizeClassNames}>
          ({(fileValue?.size / 1024).toFixed(2)} KB)
        </span>
      </div>

      <Button
        fieldKey={fieldKey}
        field={field}
        classNamePrefix={classNamePrefix}
        fillType="border"
        size="small"
        title="Remove"
        innerProps={{ onClick: () => handleRemove() }}
      />
    </div>
  )
}

export default React.memo(ManagedFilePreview)
