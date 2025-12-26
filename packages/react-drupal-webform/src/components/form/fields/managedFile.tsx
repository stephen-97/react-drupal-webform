import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import React, { useRef } from 'react'
import { handleFileChange } from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { TFileWithBase64 } from '../../../lib/types/form.d'
import ManagedFilePreview from './fields-sub-components/managedFilePreview/managedFilePreview'

const renderManagedFile = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, onBlur } = props
  const { control } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)

  // Custom file input (via fieldById ou custom global)
  const CustomInputFile =
    components?.fieldById?.[fieldKey] ?? components?.managedFile

  const CustomManagedFilePreview =
    components?.managedFilePreview ?? ManagedFilePreview

  // RHF controller (unique)
  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  // Gestion des extensions
  const fileExtensions = field?.['#file_extensions']
    ?.trim()
    .split(' ')
    .map((ext) => `.${ext}`)
    .join(', ')

  const value: TFileWithBase64 | {} = fieldController.value ?? {}

  const handleRemove = () => {
    fieldController.onChange({})
  }

  const isFileWithBase64 = (obj: any): obj is TFileWithBase64 =>
    obj &&
    typeof obj === 'object' &&
    'base64' in obj &&
    typeof obj.base64 === 'string'

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      components={components}
      classNameFieldName="fieldInput"
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomInputFile ? (
        <CustomInputFile {...props} />
      ) : (
        <>
          {isFileWithBase64(value) ? (
            <CustomManagedFilePreview
              value={value}
              handleRemove={handleRemove}
            />
          ) : (
            <input
              id={fieldKey}
              ref={inputRef}
              className={cn(
                classNames.fields.managedFile.input,
                styles.field,
                styles.input,
                styles[field?.['#type']],
                { [styles.error]: fieldState?.error }
              )}
              name={fieldController.name}
              minLength={field?.['#minlength']}
              maxLength={field?.['#maxlength']}
              placeholder={field?.['#placeholder']}
              type="file"
              accept={fileExtensions}
              onChange={(e) => handleFileChange(e, fieldController, inputRef)}
              onBlur={onBlur}
            />
          )}
        </>
      )}
    </Wrapper>
  )
}

export default renderManagedFile
