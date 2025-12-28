import {
  TWebformResolvedStateMessages,
  TWebformStateMessages,
} from '../../types/form.d'

export const normalizeStateMessages = (
  messages: Partial<TWebformStateMessages>,
  defaults: TWebformResolvedStateMessages
): TWebformResolvedStateMessages => {
  const resolve = (v: unknown): string =>
    typeof v === 'function' ? v({} as any) : String(v ?? '')

  const result: TWebformResolvedStateMessages = {
    general: {
      errorMessage:
        resolve(messages.general?.errorMessage) ||
        defaults.general.errorMessage,
      requiredMessage:
        resolve(messages.general?.requiredMessage) ||
        defaults.general.requiredMessage,
    },
    fields: {
      errorMessages: { ...defaults.fields.errorMessages },
      requiredMessages: { ...defaults.fields.requiredMessages },
    },
  }

  // ---- errorMessages ----
  for (const key of Object.keys(defaults.fields.errorMessages) as Array<
    keyof TWebformResolvedStateMessages['fields']['errorMessages']
  >) {
    const userValue = messages.fields?.errorMessages?.[key]

    if (userValue !== undefined) {
      result.fields.errorMessages[key] = resolve(userValue)
    }
  }

  // ---- requiredMessages ----
  for (const key of Object.keys(defaults.fields.requiredMessages) as Array<
    keyof TWebformResolvedStateMessages['fields']['requiredMessages']
  >) {
    const userValue = messages.fields?.requiredMessages?.[key]

    if (userValue !== undefined) {
      result.fields.requiredMessages[key] = resolve(userValue)
    }
  }

  return result
}
