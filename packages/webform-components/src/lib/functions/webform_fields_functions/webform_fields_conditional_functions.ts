import {
  TWebformCustomValidators,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
} from '../../types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TDrupal_FieldType } from '../../types/components/field'
import {
  formatMessage,
  getErrorMessage,
  getRequiredMessage,
} from '../webform_validation_functions/webform_validation_functions'
import FormMappingFields from '../../../components/form/formMappingFields/formMappingFields'
import * as yup from 'yup'

export const checkVisibilityCondition = (
  watched: any,
  expectedKey: any
): boolean => {
  return watched === expectedKey
}

export function shouldFieldBeVisible(
  fieldKey: string,
  elementsSource: Record<string, any>,
  watchedValues: Record<string, string>
): boolean {
  const fieldConfig = elementsSource[fieldKey]
  const visibleStates = fieldConfig?.['#states']?.visible
  if (!visibleStates) {
    return true
  }

  if (!Array.isArray(visibleStates)) {
    return Object.entries(visibleStates as Record<string, any>).every(
      ([selector, conditions]) => {
        const match = selector.match(/:input\[name="([^"]+)"\]/)
        if (!match) return true
        const depName = match[1]
        const watched = watchedValues[depName]
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return checkVisibilityCondition(watched, conditions.value)
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
          return checkVisibilityCondition(watched, conditions.value)
        }
        return true
      }
    )
  })
}

export type TDependentField = { name: string; type: string }

const LAYOUT_TYPES: ReadonlySet<string> = new Set([
  'webform_section',
  'webform_flexbox',
  'container',
  'details',
  'fieldset',
])

function isLayoutType(type: unknown): type is string {
  return typeof type === 'string' && LAYOUT_TYPES.has(type)
}

export function extractVisibleFields(
  source: Record<string, any>,
  visibleKeys: string[],
  watchedValues: Record<string, any>
): Array<{ key: string; field: any }> {
  const result: Array<{ key: string; field: any }> = []

  visibleKeys.forEach((key) => {
    const field = source[key]
    if (!field) return

    const type = field['#type']
    if (isLayoutType(type)) {
      const childFields = Object.fromEntries(
        Object.entries(field).filter(([k]) => !k.startsWith('#'))
      )

      const childVisibleKeys = Object.keys(childFields).filter((childKey) =>
        shouldFieldBeVisible(childKey, childFields, watchedValues)
      )

      result.push(
        ...extractVisibleFields(childFields, childVisibleKeys, watchedValues)
      )
    } else {
      result.push({ key, field })
    }
  })

  return result
}

export function getDependentFields(
  elementsSource: Record<string, any>
): TDependentField[] {
  const depsMap = new Map<string, string>()

  function extractDeps(source: Record<string, any>) {
    Object.values(source).forEach((fieldConfig) => {
      if (!fieldConfig || typeof fieldConfig !== 'object') return

      const visibleStates = fieldConfig?.['#states']?.visible
      if (visibleStates) {
        const statesArray = Array.isArray(visibleStates)
          ? visibleStates
          : [visibleStates]

        console.log('visibleStates', visibleStates)
        console.log('statesArray', statesArray)

        statesArray.forEach((stateCond: any) => {
          if (typeof stateCond !== 'object' || stateCond === null) return
          Object.keys(stateCond).forEach((selector) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/)
            if (match) {
              const depName = match[1]
              const depType = source[depName]?.['#type'] || 'unknown'
              depsMap.set(depName, depType)
            }
          })
        })
      }

      const type = fieldConfig['#type']
      if (isLayoutType(type)) {
        const childFields = Object.fromEntries(
          Object.entries(fieldConfig).filter(([k]) => !k.startsWith('#'))
        )
        extractDeps(childFields)
      }
    })
  }

  extractDeps(elementsSource)

  return Array.from(depsMap.entries()).map(([name, type]) => ({ name, type }))
}

export const generateFormSchemaAndDefaults = ({
  elementsSource,
  visibleElementsKeys,
  defaultFieldValues,
  defaultFieldStateMessages,
  customValidators,
  watchedValues = {},
}: {
  elementsSource: Record<string, any>
  visibleElementsKeys: string[]
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
  customValidators?: TWebformCustomValidators
  watchedValues?: Record<string, any>
}) => {
  const defaults: Record<string, any> = {}
  const yupObjLocal: Record<string, any> = {}

  const realVisibleFields: Array<{ key: string; field: any }> =
    extractVisibleFields(elementsSource, visibleElementsKeys, watchedValues)

  realVisibleFields.forEach(({ key, field }) => {
    const type: TDrupal_FieldType = field?.['#type']
    const required = Boolean(field?.['#required'])

    const requiredMessage = formatMessage(
      getRequiredMessage(defaultFieldStateMessages, type) ?? '',
      field?.['#title']
    )
    const errorMessage = formatMessage(
      getErrorMessage(defaultFieldStateMessages, type) ?? '',
      field?.['#title']
    )

    FormMappingFields[type ?? 'default']?.validator?.({
      yupObject: yupObjLocal,
      defaultValues: defaults,
      key,
      field,
      required,
      defaultFieldValues,
      defaultFieldStateMessages,
      requiredMessage,
      customValidators,
      errorMessage,
    })
  })

  return {
    defaultValues: defaults,
    validationSchema: yup.object().shape(yupObjLocal),
  }
}
