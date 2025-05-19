import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import React, { useRef } from 'react'
import { handleFileChange } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFileWithBase64 } from '@/lib/types/form.d'
import ManagedFilePreview from '@/components/webform/form/fields/fields-sub-components/managedFilePreview/managedFilePreview'

export const renderManagedFile = (props: TFieldObj) => {
  const { key, ...restProps } = props

  const { components, field, classNames, onBlur, control, keyForMap } =
    restProps
  const inputRef = useRef<HTMLInputElement>(null)
  const CustomInputFile = components?.managedFile
  const CustomManagedFilePreview =
    components?.managedFilePreview ?? ManagedFilePreview

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  const fileExtensions = field?.['#file_extensions']
    ?.trim()
    .split(' ')
    .map((ext) => `.${ext}`)
    .join(', ')

  const value: TFileWithBase64 | {} = fieldController.value

  const handleRemove = () => {
    fieldController.onChange({})
  }

  const isFileWithBase64 = (obj: any): obj is TFileWithBase64 => {
    return (
      obj &&
      typeof obj === 'object' &&
      'base64' in obj &&
      typeof obj.base64 === 'string'
    )
  }

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      components={components}
      classNameFieldName="fieldInput"
      key={keyForMap}
    >
      {CustomInputFile ? (
        <CustomInputFile
          fieldController={fieldController}
          fieldState={fieldState}
          {...restProps}
        />
      ) : (
        <>
          {isFileWithBase64(value) ? (
            <CustomManagedFilePreview
              value={value}
              handleRemove={() => handleRemove()}
            />
          ) : (
            <input
              ref={inputRef}
              className={cn(
                classNames.fields.managedFile.input,
                styles.field,
                styles.input,
                styles[field?.['#type']],
                {
                  [styles.error]: fieldState.error,
                }
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
