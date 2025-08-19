import { TFieldValidate } from '../../../../lib/types/components/validate'
import { TDrupal_FieldType } from '../../../../lib/types/components/field'
import { formatMessage } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import {
  getRequiredMessage,
  getErrorMessage,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import FormMappingFields from '../../formMappingFields/formMappingFields'

export const validateLayout = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    field,
    valueFormat,
    defaultFieldValues,
    defaultFieldStateMessages,
    customValidators,
  } = props

  const childKeys = Object.keys(field).filter((k) => !k.startsWith('#'))

  childKeys.forEach((childKey) => {
    const childField = (field as any)[childKey]
    const type: TDrupal_FieldType = childField['#type']

    const required = childField?.['#required']

    const requiredMessage = formatMessage(
      getRequiredMessage(defaultFieldStateMessages, type) ?? '',
      childField?.['#title']
    )

    const errorMessage = formatMessage(
      getErrorMessage(defaultFieldStateMessages, type) ?? '',
      childField?.['#title']
    )

    FormMappingFields[type ?? 'default']?.validator?.({
      yupObject,
      defaultValues,
      key: childKey,
      field: childField,
      required: Boolean(required),
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
      requiredMessage,
      customValidators,
      errorMessage,
    })
  })
}
