import { TFieldValidate } from "../../../../lib/types/components/validate"
import { mixed } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from "../../../../lib/functions/webform_validation_functions/webform_validation_functions"

export const validateManagedFile = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    defaultFieldValues,
    requiredMessage,
    customValidators,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  const defaultSchema = mixed<File>()
    .test('fileRequired', 'file is required', (value: any) => {
      if (required) {
        return value instanceof File && value.size > 0
      }
      return true
    })
    .test(
      'fileSize',
      `max size ${field?.['#max_filesize'] || 5} MB`,
      (value: any) => {
        if (!value || !(value instanceof File)) return true
        const maxFileSizeMB = field?.['#max_filesize'] || 10
        const maxSizeInBytes = maxFileSizeMB * 1024 * 1024
        return value.size < maxSizeInBytes
      }
    )

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.managed_file
}
