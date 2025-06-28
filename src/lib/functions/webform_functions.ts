import YAML from 'yaml'
import {
  getMultiStepProperties,
  isMultiStep,
  TMultiStepProperties,
} from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'

type TKeyValue<T = string> = Record<string, T>

type TWebformProperties = {
  elementsSources: Record<string, any>
  isMultiStep: boolean
  multiStepExtra: TMultiStepProperties | null
}

const getWebformProperties = (elements: string): TWebformProperties => {
  const elementsSources: Record<string, any> = YAML.parse(elements)
  const formIsMultiStep = isMultiStep(elementsSources)
  const multiStepExtra = formIsMultiStep
    ? { ...getMultiStepProperties(elementsSources) }
    : null

  return {
    elementsSources,
    isMultiStep: formIsMultiStep,
    multiStepExtra,
  }
}

export type { TKeyValue }
export { getWebformProperties }
