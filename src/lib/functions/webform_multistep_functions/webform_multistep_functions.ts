import {
  conditionalStepsProperties,
  TConditionalStepsProperties,
} from '@/lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions'
import { TKeyValue } from '@/lib/functions/webform_functions'
import {
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { generateFormSchemaAndDefaults } from '@/lib/functions/webform_fields_functions/webform_fields_conditional_functions'

type TCleanedStepElements = {
  only_steps_elements: TKeyValue<any>
  only_action_element: TKeyValue<any>
}

type TMultiStepProperties = {
  conditions_properties: TConditionalStepsProperties
} & TCleanedStepElements

const isMultiStep = (elementsSource: TKeyValue<any>): boolean => {
  return Object.values(elementsSource).some(
    (value: TKeyValue<any>) => value?.['#type'] === 'webform_wizard_page'
  )
}

const cleanMultiStepFormObj = (data: TKeyValue<any>): TCleanedStepElements => {
  const only_steps_elements: TKeyValue<any> = {}
  const only_action_element: TKeyValue<any> = {}

  for (const [key, value] of Object.entries(data)) {
    if (value && value?.['#type'] === 'webform_wizard_page') {
      only_steps_elements[key] = value
    }
    if (
      value &&
      value?.['#type'] === 'webform_actions' &&
      value?.['#submit__label']?.length > 0
    ) {
      only_action_element[key] = value
    }
  }

  return { only_steps_elements, only_action_element }
}

const getMultiStepProperties = (
  elementsSource: TKeyValue<any>
): TMultiStepProperties => {
  const conditions_properties = conditionalStepsProperties(elementsSource)
  const { only_steps_elements, only_action_element } =
    cleanMultiStepFormObj(elementsSource)

  return {
    conditions_properties,
    only_steps_elements,
    only_action_element,
  }
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

  Object.entries(elementsSource).forEach(([stepKey, stepObj]) => {
    const fieldKeys = Object.keys(stepObj).filter(
      (key) =>
        !key.startsWith('#') &&
        typeof stepObj[key] === 'object' &&
        Boolean(stepObj[key]['#type'])
    )
    // Utilise generateFormSchemaAndDefaults pour cette étape
    const { defaultValues } = generateFormSchemaAndDefaults({
      elementsSource: stepObj,
      visibleElementsKeys: fieldKeys,
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
    })
    // Merge dans l’objet global
    allDefaultValues = { ...allDefaultValues, ...defaultValues }
  })

  return allDefaultValues
}

export type { TMultiStepProperties }
export { getMultiStepProperties, isMultiStep, cleanMultiStepFormObj }
