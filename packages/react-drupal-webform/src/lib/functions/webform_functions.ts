import { isMultiStep } from './webform_multistep_functions/webform_multistep_functions'

type TKeyValue<T = string> = Record<string, T>

type TWebformProperties = {
  elementsSources: Record<string, any>
  isMultiStep: boolean
}

const getWebformProperties = (
  elements: Record<any, string>
): TWebformProperties => {
  const formIsMultiStep = isMultiStep(elements)

  return {
    elementsSources: elements,
    isMultiStep: formIsMultiStep,
  }
}

export type { TKeyValue }
export { getWebformProperties }
