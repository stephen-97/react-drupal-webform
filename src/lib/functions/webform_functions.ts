import YAML from 'yaml'
import { conditionalStepsProperties } from '@/lib/functions/webform_sub_functions/webform_sub_functions'

type TKeyValue<T = string> = Record<string, T>

const checkMultiStep = (elementsSource: TKeyValue<any>) => {
  return Object.values(elementsSource).some(
    (value: TKeyValue<any>) => value?.['#type'] === 'webform_wizard_page'
  )
}

const getMultiStepProperties = (elementsSource: TKeyValue<any>) => {
  const conditions_properties = conditionalStepsProperties(elementsSource)

  return {
    conditions_properties,
  }
}

const getWebformProperties = (elements: string) => {
  const elements_sources: TKeyValue<any> = YAML.parse(elements)
  const is_multi_step = checkMultiStep(elements_sources)
  const multi_step_extra = is_multi_step
    ? { ...getMultiStepProperties(elements_sources) }
    : null

  return {
    elements_sources,
    is_multi_step,
    multi_step_extra,
  }
}

export type { TKeyValue }
export { getWebformProperties }
