import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const validateNumber = (props: TFieldValidate) => {
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

  const defaultSchema = string()

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.number
}
