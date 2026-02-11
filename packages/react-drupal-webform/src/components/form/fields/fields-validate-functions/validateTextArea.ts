import { string } from 'yup'
import { FieldValidateProps } from '../../../../lib/types/components/validate'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
  formatMessage,
  getRequiredMessage,
  applyMinMaxLength,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions'

export const validateTextArea = (props: FieldValidateProps) => {
  const {
    yupObject,
    defaultValues,
    key,
    required,
    defaultFieldValues,
    rhfDefaultFieldStateMessages,
    field,
    rhfCustomValidators,
    minLengthMessage,
    maxLengthMessage,
  } = props

  if (field?.['#readonly']) {
    defaultValues[key] = defaultFieldValues.textarea
    return
  }

  const type = field?.['#type'] as TDrupal_FieldType_Validate | undefined

  const requiredMessage = formatMessage(
    getRequiredMessage(rhfDefaultFieldStateMessages, 'textarea') ?? '',
    field?.['#title']
  )
  let defaultSchema = string()

  defaultSchema = applyMinMaxLength(
    defaultSchema,
    field,
    minLengthMessage,
    maxLengthMessage
  )

  defaultSchema = applyPatternIfApplicable({
    schema: defaultSchema,
    field,
  })

  const customSchema =
    resolveCustomValidator(rhfCustomValidators, key, type, props) ??
    defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.textarea
}
