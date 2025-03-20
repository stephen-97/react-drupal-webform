import { TKeyValue } from '@/lib/functions/webform_functions'

type TConditionalSteps = {
  key: string
  fields_dependent: string[]
}
type TConditionalStepssProperties = {
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
      fields.push(matches?.at?.[1])
    }
  })
  return fields
}

const conditionalStepsProperties = (
  elementsSource: TKeyValue<any>
): TConditionalStepssProperties => {
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

export { conditionalStepsProperties }
