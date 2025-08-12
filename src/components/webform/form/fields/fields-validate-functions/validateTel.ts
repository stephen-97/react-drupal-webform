import { string } from 'yup'
import { TFieldValidate } from '@/lib/types/components/validate'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const validateTel = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    defaultFieldValues,
    requiredMessage,
    errorMessage,
    customValidators,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  const defaultSchema = string().matches(/^[0-9]+$/, {
    message: errorMessage,
    excludeEmptyString: true,
  })

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.tel
}
