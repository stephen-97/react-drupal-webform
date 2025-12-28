import { TFieldValidate } from '../../types/components/validate'
import { TDrupal_FieldType } from '../../types/components/field'

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
  const type = field?.['#type'] as TDrupal_FieldType | undefined

  if (!type) return ''

  const fieldMessages =
    kind === 'required'
      ? defaultFieldStateMessages.fields.requiredMessages
      : defaultFieldStateMessages.fields.errorMessages

  const generalMessage =
    kind === 'required'
      ? defaultFieldStateMessages.general.requiredMessage
      : defaultFieldStateMessages.general.errorMessage

  const rawMessage =
    fieldMessages[type as keyof typeof fieldMessages] || generalMessage || ''

  const fieldName = field?.['#title'] || ''
  return rawMessage.replace('{fieldName}', fieldName)
}
