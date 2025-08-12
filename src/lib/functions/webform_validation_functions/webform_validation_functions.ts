import {
  TWebformCustomValidators,
  TWebformStateMessages,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TDrupal_FieldType } from '@/lib/types/components/field'
import { AnySchema, StringSchema } from 'yup'
import { TFieldValidate } from '@/lib/types/components/validate'

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

  // Vérifie par ID d'abord
  const byId = customValidators.byId?.[key]
  if (byId) {
    return byId(args) as unknown as S
  }

  // Sinon vérifie par type
  if (type && customValidators.byType?.[type]) {
    return customValidators.byType[type]!(args) as unknown as S
  }

  return null
}
