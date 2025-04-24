import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { mixed } from 'yup'

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
