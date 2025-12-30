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
      minLengthMessage:
        messages.general?.minLengthMessage ?? defaults.general.minLengthMessage,
      maxLengthMessage:
        messages.general?.maxLengthMessage ?? defaults.general.maxLengthMessage,
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
      minLengthMessages: {
        ...defaults.fields.minLengthMessage,
        ...messages.fields?.minLengthMessages,
      },
      maxLengthMessages: {
        ...defaults.fields.maxLengthMessage,
        ...messages.fields?.maxLengthMessages,
      },
    },
  }
}
