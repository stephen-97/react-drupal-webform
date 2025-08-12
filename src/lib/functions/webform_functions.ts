import YAML from 'yaml'
import { isMultiStep } from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'

type TKeyValue<T = string> = Record<string, T>

type TWebformProperties = {
  elementsSources: Record<string, any>
  isMultiStep: boolean
}

const getWebformProperties = (elements: string): TWebformProperties => {
  const elementsSources: Record<string, any> = YAML.parse(elements)
  const formIsMultiStep = isMultiStep(elementsSources)

  return {
    elementsSources,
    isMultiStep: formIsMultiStep,
  }
}

export type { TKeyValue }
export { getWebformProperties }
