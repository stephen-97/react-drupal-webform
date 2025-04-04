import {
  conditionalStepsProperties,
  TConditionalStepsProperties,
} from '@/lib/functions/webform_multistep_functions/webform_multistep_conditional_functions/webform_multistep_conditional_functions'
import { TKeyValue } from '@/lib/functions/webform_functions'

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

export type { TMultiStepProperties }
export { getMultiStepProperties, isMultiStep, cleanMultiStepFormObj }
