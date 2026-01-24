import { TFieldValidate } from '../../types/components/validate'
import { TDrupal_FieldType, TElementSource } from '../../types/components/field'
import {
  TWebformErrorMessageFieldType,
  TWebformLengthMessageFieldType,
} from '../../types/form.d'

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

export type TResolvedFieldMessages = {
  required: string
  error: string
  minLength: string
  maxLength: string
}

export const isErrorMessageFieldType = (
  type: TDrupal_FieldType
): type is TWebformErrorMessageFieldType => {
  return (
    type !== 'webform_markup' &&
    type !== 'webform_actions' &&
    type !== 'fieldset' &&
    type !== 'webform_section' &&
    type !== 'webform_flexbox'
  )
}

export const isLengthMessageFieldType = (
  type: unknown
): type is TWebformLengthMessageFieldType => {
  return (
    typeof type === 'string' &&
    type !== 'webform_markup' &&
    type !== 'webform_actions' &&
    type !== 'fieldset' &&
    type !== 'select' &&
    type !== 'managed_file'
  )
}

export const resolveFieldMessages = (
  props: TFieldValidate
): TResolvedFieldMessages => {
  const { field, defaultFieldStateMessages } = props
  const type = field?.['#type']

  const fieldName = field?.['#title'] ?? ''
  const minLength =
    typeof field?.['#minlength'] === 'number' ? String(field['#minlength']) : ''
  const maxLength =
    typeof field?.['#maxlength'] === 'number' ? String(field['#maxlength']) : ''

  const resolve = (
    value?: string | ((field: TElementSource) => string)
  ): string => {
    if (value == null) return ''
    return typeof value === 'function' ? value(field) : value
  }

  const replaceTokens = (msg: string) =>
    msg
      .replace('{fieldName}', fieldName)
      .replace('{minLength}', minLength)
      .replace('{maxLength}', maxLength)

  const general = defaultFieldStateMessages.general
  const fields = defaultFieldStateMessages.fields

  const required = isErrorMessageFieldType(type)
    ? resolve(fields.requiredMessages[type])
    : ''

  const error = isErrorMessageFieldType(type)
    ? resolve(fields.errorMessages[type])
    : ''

  const minLen = isLengthMessageFieldType(type)
    ? resolve(fields.minLengthMessages?.[type])
    : ''

  const maxLen = isLengthMessageFieldType(type)
    ? resolve(fields.maxLengthMessages?.[type])
    : ''

  const requiredResolved =
    field?.['#required_error'] && field['#required_error'].length > 0
      ? field['#required_error']
      : replaceTokens(required || resolve(general.requiredMessage))

  return {
    required: requiredResolved,
    error: replaceTokens(error || resolve(general.errorMessage)),
    minLength: replaceTokens(minLen || resolve(general.minLengthMessage)),
    maxLength: replaceTokens(maxLen || resolve(general.maxLengthMessage)),
  }
}
