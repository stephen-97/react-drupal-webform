import { TKeyValue } from '../webform_functions'
import {
  TWebformDefaultFieldValues,
  TWebformNormalizedStateMessages,
  TWebformStateMessages,
} from '../../types/form.d'
import { DeepRequired } from 'react-hook-form'
import { generateFormSchemaAndDefaults } from '../webform_fields_functions/webform_fields_conditional_functions'
import { TDrupal_FieldType } from '../../types/components/field'

const isMultiStep = (elementsSource: TKeyValue<any>): boolean => {
  return Object.values(elementsSource).some(
    (value: TKeyValue<any>) => value?.['#type'] === 'webform_wizard_page'
  )
}

export const getAllFieldNames = (
  elementsSource: Record<string, any>
): string[] => {
  const allFields: string[] = []
  Object.values(elementsSource).forEach((stepObj: any) => {
    Object.keys(stepObj).forEach((fieldKey) => {
      if (
        !fieldKey.startsWith('#') &&
        typeof stepObj[fieldKey] === 'object' &&
        Boolean(stepObj[fieldKey]['#type'])
      ) {
        allFields.push(fieldKey)
      }
    })
  })
  return allFields
}

const collectDefaultsFromObject = (
  obj: Record<string, any>,
  acc: Record<string, any>,
  defaultFieldValues: Partial<TWebformDefaultFieldValues>
) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (key.startsWith('#') || typeof value !== 'object' || value === null) {
      return
    }

    const type = value?.['#type'] as TDrupal_FieldType | undefined

    if (!type) {
      collectDefaultsFromObject(value, acc, defaultFieldValues)
      return
    }

    if (!(type in defaultFieldValues)) {
      collectDefaultsFromObject(value, acc, defaultFieldValues)
      return
    }

    acc[key] = defaultFieldValues[type as keyof TWebformDefaultFieldValues]
  })
}

export const getDummyDefaultMultiStep = (
  elementsSource: Record<string, any>,
  defaultFieldValues: Partial<TWebformDefaultFieldValues>
): Record<string, any> => {
  const allDefaults: Record<string, any> = {}

  Object.values(elementsSource).forEach((stepObj) => {
    collectDefaultsFromObject(
      stepObj as Record<string, any>,
      allDefaults,
      defaultFieldValues
    )
  })

  return allDefaults
}

export const getAllDefaultValuesFromAllSteps = ({
  elementsSource,
  defaultFieldValues,
  defaultFieldStateMessages,
}: {
  elementsSource: Record<string, any>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: TWebformNormalizedStateMessages
}) => {
  let allDefaultValues: Record<string, any> = {}

  Object.entries(elementsSource).forEach(([_, stepObj]) => {
    const fieldKeys = Object.keys(stepObj).filter(
      (key) =>
        !key.startsWith('#') &&
        typeof stepObj[key] === 'object' &&
        Boolean(stepObj[key]['#type'])
    )
    const { defaultValues } = generateFormSchemaAndDefaults({
      elementsSource: stepObj,
      visibleElementsKeys: fieldKeys,
      defaultFieldValues,
      defaultFieldStateMessages,
    })
    allDefaultValues = { ...allDefaultValues, ...defaultValues }
  })

  return allDefaultValues
}

export { isMultiStep }
