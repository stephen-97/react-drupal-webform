import React, { useRef } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { ManagedFileProps } from '../../../../lib/types/components/managedFile'
import { handleFileChange } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import ManagedFilePreview from '../fields-sub-components/managedFilePreview/managedFilePreview'
import { TFileWithBase64 } from '../../../../lib/types/form.d'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const ManagedFile = ({
  fieldKey,
  field,
  className,
  innerProps,
  components,
  ariaDescribedBy,
  classNamePrefix,
}: ManagedFileProps) => {
  const { control } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  const PreviewComponent = components?.managedFilePreview ?? ManagedFilePreview

  const fileExtensions = field?.['#file_extensions']
    ?.trim()
    .split(' ')
    .map((ext) => `.${ext}`)
    .join(', ')

  const value = fieldController.value ?? {}

  const isFileWithBase64 = (obj: any): obj is TFileWithBase64 =>
    obj &&
    typeof obj === 'object' &&
    'base64' in obj &&
    typeof obj.base64 === 'string'

  const handleRemove = () => {
    fieldController.onChange({})
  }

  if (isFileWithBase64(value)) {
    return (
      <PreviewComponent
        field={field}
        fieldKey={fieldKey}
        classNamePrefix={classNamePrefix}
        value={value}
        handleRemove={handleRemove}
      />
    )
  }

  const inputClassNames = getClassNames({
    name: 'managedFile',
    prefix: classNamePrefix,
    baseCn: cn(styles.field, styles.input, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'managedFile',
  })

  return (
    <input
      id={fieldKey}
      ref={inputRef}
      type="file"
      name={fieldController.name}
      accept={fileExtensions}
      onChange={(e) => handleFileChange(e, fieldController, inputRef)}
      className={inputClassNames}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(ManagedFile)
