import { TKeyValue } from '@/lib/functions/webform_functions'
import {
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { generateFormSchemaAndDefaults } from '@/lib/functions/webform_fields_functions/webform_fields_conditional_functions'

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

export const getDummyDefaultMultiStep = (
  elementsSource: Record<string, any>
) => {
  const allDefaults: Record<string, any> = {}

  Object.values(elementsSource).forEach((stepObj) => {
    Object.keys(stepObj).forEach((key) => {
      if (
        !key.startsWith('#') &&
        typeof stepObj[key] === 'object' &&
        Boolean(stepObj[key]['#type'])
      ) {
        allDefaults[key] = ''
      }
    })
  })

  return allDefaults
}

export const getAllDefaultValuesFromAllSteps = ({
  elementsSource,
  valueFormat,
  defaultFieldValues,
  defaultFieldStateMessages,
}: {
  elementsSource: Record<string, any>
  valueFormat: Required<TWebformValueFormat>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
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
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
    })
    allDefaultValues = { ...allDefaultValues, ...defaultValues }
  })

  return allDefaultValues
}

export { isMultiStep }
