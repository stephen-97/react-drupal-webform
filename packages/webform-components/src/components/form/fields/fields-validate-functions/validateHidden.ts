import { TFieldValidate } from '../../../../lib/types/components/validate'
import { mixed } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateHidden = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    required,
    defaultFieldValues,
    requiredMessage,
    customValidators,
    field,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  const defaultSchema = mixed()

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? customSchema.required(requiredMessage ?? 'This field is required')
    : customSchema.notRequired()

  defaultValues[key] = defaultFieldValues.hidden ?? ''
}
