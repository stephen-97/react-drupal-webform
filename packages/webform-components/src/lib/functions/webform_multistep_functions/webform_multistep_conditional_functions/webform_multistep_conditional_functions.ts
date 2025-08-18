import { TKeyValue } from "../../webform_functions"
import { TWebformValueFormat } from "../../../types/form.d"
import { shouldFieldBeVisible } from "../../webform_fields_functions/webform_fields_conditional_functions"

type TConditionalSteps = {
  key: string
  fields_dependent: string[]
}
type TConditionalStepsProperties = {
  have_conditional_step: boolean
  conditional_steps: TConditionalSteps[]
  conditional_fields: TConditionalSteps[]
  steps_with_conditional_fields: string[]
}

const getConditionFields = (visible: TKeyValue<any>): string[] => {
  const fields: string[] = []
  Object.keys(visible).forEach((key) => {
    const matches = key.match(/:input\[name="([^"]+)"\]/)
    if (matches && matches?.at?.(1)) {
      fields.push(matches[1])
    }
  })
  return fields
}

const conditionalStepsProperties = (
  elementsSource: TKeyValue<any>
): TConditionalStepsProperties => {
  const conditional_steps = new Set<TConditionalSteps>()
  const conditional_fields = new Set<TConditionalSteps>()
  const steps_with_conditional_fields = new Set<string>()
  let have_conditional_step: boolean = false

  Object.entries(elementsSource).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (value.hasOwnProperty('#states') && value['#states'].visible) {
        const conditionFields = getConditionFields(value['#states'].visible)
        if (conditionFields.length > 0) {
          conditional_steps.add({
            key,
            fields_dependent: conditionFields,
          })
        }
      }
      Object.entries(value).forEach(
        ([nestedKey, nestedValue]: [string, any]) => {
          if (typeof nestedValue === 'object' && nestedValue !== null) {
            if (
              nestedValue.hasOwnProperty('#states') &&
              nestedValue['#states'].visible
            ) {
              const conditionFields = getConditionFields(
                nestedValue['#states'].visible
              )
              steps_with_conditional_fields.add(key)
              if (conditionFields.length > 0) {
                conditional_fields.add({
                  key: nestedKey,
                  fields_dependent: conditionFields,
                })
              }
              have_conditional_step = true
            }
          }
        }
      )
    }
  })

  return {
    have_conditional_step,
    conditional_steps: Array.from(conditional_steps),
    conditional_fields: Array.from(conditional_fields),
    steps_with_conditional_fields: Array.from(steps_with_conditional_fields),
  }
}

export const shouldStepBeVisible = (
  stepObj: Record<string, any>,
  watchedValues: Record<string, any>
): boolean => {
  const visibleStates = stepObj?.['#states']?.visible
  if (!visibleStates) return true

  if (!Array.isArray(visibleStates)) {
    return Object.entries(visibleStates as Record<string, any>).every(
      ([selector, conditions]) => {
        const match = selector.match(/:input\[name="([^"]+)"\]/)
        if (!match) return true
        const depName = match[1]
        const watched = watchedValues[depName]
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return watched === conditions.value
        }
        return true
      }
    )
  }
  return visibleStates.some((stateCond: any) => {
    if (typeof stateCond !== 'object' || stateCond === null) return false
    return Object.entries(stateCond as Record<string, any>).every(
      ([selector, conditions]) => {
        const match = selector.match(/:input\[name="([^"]+)"\]/)
        if (!match) return true
        const depName = match[1]
        const watched = watchedValues[depName]
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return watched === conditions.value
        }
        return true
      }
    )
  })
}

export const getVisibleStepKeys = (
  stepKeys: string[],
  elementsSource: Record<string, any>,
  watchedValuesAllFields: Record<string, any>,
  valueFormat: Required<TWebformValueFormat>
) => {
  return stepKeys.filter((stepKey) => {
    const stepObj = elementsSource[stepKey]
    if (!stepObj['#states'] || !stepObj['#states'].visible) return true
    return shouldFieldBeVisible(
      stepKey,
      elementsSource,
      watchedValuesAllFields,
      valueFormat
    )
  })
}

export const getAllVisibleFieldNames = (
  visibleStepKeys: string[],
  elementsSource: Record<string, any>,
  watchedValuesAllFields: Record<string, any>,
  valueFormat: Required<TWebformValueFormat>
): string[] => {
  return visibleStepKeys.flatMap((stepKey) => {
    const stepObj = elementsSource[stepKey]
    return Object.keys(stepObj).filter(
      (fieldKey) =>
        !fieldKey.startsWith('#') &&
        typeof stepObj[fieldKey] === 'object' &&
        Boolean(stepObj[fieldKey]['#type']) &&
        shouldFieldBeVisible(
          fieldKey,
          stepObj,
          watchedValuesAllFields,
          valueFormat
        )
    )
  })
}

export type { TConditionalSteps, TConditionalStepsProperties }
export { conditionalStepsProperties }
