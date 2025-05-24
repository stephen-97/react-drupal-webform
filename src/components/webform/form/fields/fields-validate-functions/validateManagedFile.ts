import { TFieldValidate } from '@/lib/types/components/validate'
import {
  formatMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { mixed } from 'yup'

export const validateManagedFile = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  defaultFieldValues,
  requiredMessage,
}: TFieldValidate) => {
  const schema = mixed<File>()
    .test('fileRequired', 'file is required', (value: any) => {
      if (required) {
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

  yupObject[key] = required ? schema.required(requiredMessage) : schema
  defaultValues[key] = defaultFieldValues.managed_file
}
