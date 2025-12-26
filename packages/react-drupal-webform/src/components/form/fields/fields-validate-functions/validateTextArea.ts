import { string } from 'yup'
import { TFieldValidate } from "../../../../lib/types/components/validate"
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
  formatMessage,
  getRequiredMessage,
} from "../../../../lib/functions/webform_validation_functions/webform_validation_functions"

export const validateTextArea = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    required,
    defaultFieldValues,
    defaultFieldStateMessages,
    field,
    customValidators,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate | undefined

  const requiredMessage = formatMessage(
    getRequiredMessage(defaultFieldStateMessages, 'textarea') ?? '',
    field?.['#title']
  )
  const defaultSchema = string()

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.textarea
}
