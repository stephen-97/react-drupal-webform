import { mixed } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/components/validate'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import React, { useRef } from 'react'
import { defaultValuesObj } from '@/lib/const/const.form'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderManagedFile = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
  components,
}: TFieldObj) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { field: fieldController } = useController<any>({
    name: key,
    control,
  })

  const fileExtensions = field?.['#file_extensions']
    ?.trim()
    .split(' ')
    .map((ext) => `.${ext}`)
    .join(', ')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = event.target
      if (files && files.length > 0 && inputRef?.current) {
        const filesArray = [...files]
        fieldController.onChange(filesArray[0])
        inputRef.current.value = ''
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {}
  }

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      components={components}
      classNameFieldName={'fieldInput'}
      key={keyForMap}
    >
      <input
        ref={inputRef}
        className={cn(styles.field, styles.input)}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        placeholder={field?.['#placeholder']}
        type={'file'}
        accept={fileExtensions}
        onChange={handleFileChange}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

export const validateManagedFile = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'managedFile'
  )

  const schema = mixed<File>()
    .test('fileRequired', 'file is required', (value: any) => {
      if (visibility) {
        return value instanceof File && value.size > 0
      }
      return true
    })
    .test(
      'fileSize',
      `max sire ${field?.['#max_filesize'] || 5}`,
      (value: any) => {
        if (!value || !(value instanceof File)) return true
        const maxFileSizeMB = field?.['#max_filesize'] || 10
        const maxSizeInBytes = maxFileSizeMB * 1024 * 1024
        return value.size < maxSizeInBytes
      }
    )

  yupObject[key] = visibility ? schema.required(requiredMessage) : schema
  defaultValues[key] = defaultFieldValues.managedFile
}
