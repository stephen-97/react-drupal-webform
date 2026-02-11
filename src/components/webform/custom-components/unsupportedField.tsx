import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { UnsupportedFieldProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/unsupportedField'

const CustomUnsupportedField = (props: UnsupportedFieldProps) => {
  const { fieldKey, field } = props
  const { control } = useFormContext()

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  return (
    <input
      id={fieldKey}
      name={fieldController.name}
      minLength={field?.['#minlength']}
      maxLength={field?.['#maxlength']}
      placeholder={field?.['#placeholder']}
      type={'text'}
      onChange={(e) => fieldController.onChange(e)}
      value={fieldController.value ?? ''}
      required={field?.['#required']}
    />
  )
}

export default React.memo(CustomUnsupportedField)
