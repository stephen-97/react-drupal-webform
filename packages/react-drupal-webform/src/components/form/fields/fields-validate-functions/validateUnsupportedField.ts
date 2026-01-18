import { TFieldValidate } from '../../../../lib/types/components/validate'
import { mixed } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateUnsupportedField = (props: TFieldValidate) => {
  const { yupObject, defaultValues, key, customValidators, field } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  console.log('type', type)

  const defaultSchema = mixed()

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  console.log('YES')
  yupObject[key] = customSchema

  defaultValues[key] = ''
}
