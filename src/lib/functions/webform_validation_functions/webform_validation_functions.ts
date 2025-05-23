import { TWebformStateMessages } from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TDrupal_FieldType } from '@/lib/types/components/field'

export const getRequiredMessage = (
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>,
  stateFieldName: TDrupal_FieldType
) => {
  if (
    defaultFieldStateMessages.fields['requiredMessages'][stateFieldName]
      ?.length > 0
  ) {
    return defaultFieldStateMessages.fields['requiredMessages'][stateFieldName]
  }
  return defaultFieldStateMessages.general.requiredMessage
}

export const getErrorMessage = (
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>,
  stateFieldName: TDrupal_FieldType
) => {
  if (
    defaultFieldStateMessages.fields['errorMessages'][stateFieldName]?.length >
    0
  ) {
    return defaultFieldStateMessages.fields['errorMessages'][stateFieldName]
  }
  return defaultFieldStateMessages.general.errorMessage
}

export const formatMessage = (template: string, fieldName: string): string => {
  return template.replace('{fieldName}', fieldName)
}
