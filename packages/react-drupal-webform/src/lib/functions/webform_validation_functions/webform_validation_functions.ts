import {
  TWebformCustomValidators,
  TWebformStateMessages,
} from '../../types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TDrupal_FieldType, TElementSource } from '../../types/components/field'
import { AnySchema, StringSchema } from 'yup'
import { TFieldValidate } from '../../types/components/validate'

export const getRequiredMessage = (
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>,
  stateFieldName: TDrupal_FieldType
) => {
  if (
    (defaultFieldStateMessages.fields['requiredMessages'] as any)[
      stateFieldName
    ]?.length > 0
  ) {
    return (defaultFieldStateMessages.fields['requiredMessages'] as any)[
      stateFieldName
    ]
  }
  return defaultFieldStateMessages.general.requiredMessage
}

export const getErrorMessage = (
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>,
  stateFieldName: TDrupal_FieldType
) => {
  if (
    (defaultFieldStateMessages.fields['errorMessages'] as any)[stateFieldName]
      ?.length > 0
  ) {
    return (defaultFieldStateMessages.fields['errorMessages'] as any)[
      stateFieldName
    ]
  }
  return defaultFieldStateMessages.general.errorMessage
}

export const formatMessage = (template: string, fieldName: string): string => {
  return template.replace('{fieldName}', fieldName)
}

export type TDrupal_FieldType_Validate = Exclude<
  TDrupal_FieldType,
  'webform_markup' | 'webform_actions'
>

export const resolveCustomValidator = <S extends AnySchema>(
  customValidators: TWebformCustomValidators | undefined,
  key: string,
  type: TDrupal_FieldType_Validate | undefined,
  args: TFieldValidate
): S | null => {
  if (!customValidators) return null

  const byId = customValidators.byId?.[key]
  if (byId) {
    return byId(args) as unknown as S
  }

  if (type && customValidators.byType?.[type]) {
    return customValidators.byType[type]!(args) as unknown as S
  }

  return null
}

export const getDummyDefaultFormDefault = (
  elementsSource: Record<string, any>
): Record<string, any> => {
  const allDefaults: Record<string, any> = {}

  Object.keys(elementsSource).forEach((key) => {
    const field = elementsSource[key]
    const type: TDrupal_FieldType = field?.['#type']
    if (
      [
        'container',
        'webform_flexbox',
        'webform_section',
        'details',
        'webform_actions',
      ].includes(type)
    ) {
      return
    }

    allDefaults[key] = ''
  })

  return allDefaults
}

export const applyMinMaxLength = (
  schema: StringSchema<string | undefined>,
  field: TElementSource | undefined
): StringSchema<string | undefined> => {
  let nextSchema = schema

  if (typeof field?.['#minlength'] === 'number') {
    nextSchema = nextSchema.min(
      field['#minlength'],
      `Minimum ${field['#minlength']} characters`
    )
  }

  if (typeof field?.['#maxlength'] === 'number') {
    nextSchema = nextSchema.max(
      field['#maxlength'],
      `Maximum ${field['#maxlength']} characters`
    )
  }

  return nextSchema
}
