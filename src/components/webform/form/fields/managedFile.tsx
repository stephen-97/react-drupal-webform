import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import React, { useRef } from 'react'

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
