import YAML from 'yaml'
import {
  getMultiStepProperties,
  isMultiStep,
  TMultiStepProperties,
} from '@/lib/functions/webform_multistep_functions/webform_multistep_functions'

type TKeyValue<T = string> = Record<string, T>

type TWebformProperties = {
  elements_sources: Record<string, any>
  is_multi_step: boolean
  multi_step_extra: TMultiStepProperties | null
}

const getWebformProperties = (elements: string): TWebformProperties => {
  const elements_sources: TKeyValue<any> = YAML.parse(elements)
  const is_multi_step = isMultiStep(elements_sources)
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
