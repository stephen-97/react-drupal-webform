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
  unstyled,
  innerRef,
}: ManagedFileInfoProps) => {
  const wrapperClassNames = getClassNames({
    name: 'managedFileInfo',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.managedFileInfo),
  })

  const labelClassNames = getClassNames({
    name: 'managedFileLabel',
    prefix: classNamePrefix,
    unstyled: unstyled,

    baseCn: cn(styles.label),
  })

  const maxSizeClassNames = getClassNames({
    name: 'managedFileInfoMaxSize',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(styles.label),
  })

  const fileExtensionClassname = getClassNames({
    name: 'managedFileFileExtension',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(styles.label),
  })

  const dataAttributes = getDataAttributes({
    component: 'managedFileInfo',
    type: 'managed_file',
  })

  return (
    <div
      ref={innerRef}
      className={wrapperClassNames}
      {...dataAttributes}
      {...innerProps}
    >
      <span className={labelClassNames}>One file limit</span>

      <span className={maxSizeClassNames}>
        {field?.['#max_filesize'] ?? 100} MB limit
      </span>

      <span className={fileExtensionClassname}>
        Allowed types:{' '}
        {field?.['#file_extensions'] && field['#file_extensions'].length > 0
          ? field['#file_extensions']
          : 'gif, jpg, jpeg, bmp, eps, tif, pict, psd, txt, rtf, html, odf, pdf, doc, docx, ppt, pptx, xls, xlsx, xml, avi, mov, mp3, mp4, ogg, wav, bz2, dmg, gz, jar, rar, sit, svg, tar, zip.'}
      </span>
    </div>
  )
}

export default React.memo(ManagedFileInfo)
