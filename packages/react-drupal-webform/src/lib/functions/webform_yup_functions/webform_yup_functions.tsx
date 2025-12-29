import { TFieldValidate } from '../../types/components/validate'
import { TElementSource } from '../../types/components/field'

export const useYupValidationResolver =
  (validationSchema: any) => async (data: any) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      })

      return {
        values,
        errors: {},
      }
    } catch (errors) {
      return {
        values: {},
        errors: (errors as any).inner.reduce(
          (allErrors: any, currentError: any) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            },
          }),
          {}
        ),
      }
    }
  }

export const resolveFieldMessage = (
  props: TFieldValidate,
  kind: 'required' | 'error'
): string => {
  const { field, defaultFieldStateMessages } = props
  const type = field?.['#type']

  if (!type) return ''

  const fieldMessages =
    kind === 'required'
      ? defaultFieldStateMessages.fields.requiredMessages
      : defaultFieldStateMessages.fields.errorMessages

  const generalMessage =
    kind === 'required'
      ? defaultFieldStateMessages.general.requiredMessage
      : defaultFieldStateMessages.general.errorMessage

  const value =
    (
      fieldMessages as Record<
        string,
        string | ((_field: TElementSource) => string)
      >
    )[type] ?? generalMessage

  if (!value) return ''

  const resolved = typeof value === 'function' ? value(field) : value

  const fieldName = field?.['#title'] ?? ''

  return resolved.replace('{fieldName}', fieldName)
}
