import {
  TWebformNormalizedStateMessages,
  TWebformResolvedStateMessages,
  TWebformStateMessages,
} from '../../types/form.d'

export const normalizeStateMessages = (
  messages: Partial<TWebformStateMessages>,
  defaults: TWebformResolvedStateMessages
): TWebformNormalizedStateMessages => {
  return {
    general: {
      errorMessage:
        messages.general?.errorMessage ?? defaults.general.errorMessage,
      requiredMessage:
        messages.general?.requiredMessage ?? defaults.general.requiredMessage,
    },
    fields: {
      errorMessages: {
        ...defaults.fields.errorMessages,
        ...messages.fields?.errorMessages,
      },
      requiredMessages: {
        ...defaults.fields.requiredMessages,
        ...messages.fields?.requiredMessages,
      },
    },
  }
}
