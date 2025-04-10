import {
  TWebformStateMessages,
  TWebformStatesFieldTypes,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'

export const getRequiredMessage = (
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>,
  stateFieldName: TWebformStatesFieldTypes
) => {
  if (
    defaultFieldStateMessages.fields['requiredMessages'][stateFieldName]
      .length > 0
  ) {
    return defaultFieldStateMessages.fields['requiredMessages'][stateFieldName]
  }
  return defaultFieldStateMessages.general.requiredMessage
}
