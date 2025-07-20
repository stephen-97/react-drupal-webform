import {
  TFormatFieldMulti,
  TWebformDefaultFieldValues,
  TWebformStateMessages,
  TWebformValueFormat,
} from '@/lib/types/form.d'
import { DeepRequired } from 'react-hook-form'
import { TDrupal_FieldType } from '@/lib/types/components/field'
import {
  formatMessage,
  getErrorMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import FormMappingFields from '@/components/webform/form/formMappingFields/formMappingFields'
import * as yup from 'yup'

export const checkVisibilityCondition = (
  format: TFormatFieldMulti,
  depConfig: any,
  watched: any,
  expectedKeyOrValue: any
): boolean => {
  switch (format) {
    case 'key':
      return watched === expectedKeyOrValue
    case 'value': {
      const options = depConfig['#options'] || {}
      const expectedValue = options[expectedKeyOrValue] ?? expectedKeyOrValue
      return watched === expectedValue
    }
    case 'keyValue': {
      if (typeof watched !== 'object' || watched === null) return false
      const optionsKV: Record<string, any> = depConfig['#options'] || {}
      const expected = expectedKeyOrValue
      if (Array.isArray(expected)) {
        return expected.every(
          (key: string) =>
            key in watched &&
            (watched as Record<string, any>)[key] === optionsKV[key]
        )
      }
      return (
        expected in (watched as Record<string, any>) &&
        (watched as Record<string, any>)[expected] === optionsKV[expected]
      )
    }
    case 'booleanMap': {
      if (typeof watched !== 'object' || watched === null) return false
      if (Array.isArray(expectedKeyOrValue)) {
        return expectedKeyOrValue.every((k: string) => watched[k] === true)
      }
      return watched[expectedKeyOrValue] === true
    }
    default:
      return false
  }
}

export function shouldFieldBeVisible(
  fieldKey: string,
  elementsSource: Record<string, any>,
  watchedValues: Record<string, string>,
  valueFormat: Record<string, TFormatFieldMulti>
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
        const depConfig = elementsSource[depName]
        const depType = depConfig?.['#type']
        const format = valueFormat[depType] || 'key'
        const watched = watchedValues[depName]
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return checkVisibilityCondition(
            format,
            depConfig,
            watched,
            conditions.value
          )
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
        const depConfig = elementsSource[depName]
        const depType = depConfig?.['#type']
        const format = valueFormat[depType] || 'key'
        const watched = watchedValues[depName]
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return checkVisibilityCondition(
            format,
            depConfig,
            watched,
            conditions.value
          )
        }
        return true
      }
    )
  })
}

export function shouldMultiStepFieldBeVisible(
  fieldKey: string,
  elementsSource: Record<string, any>,
  watchedStepValues: Record<string, any>,
  prevStepValues: Record<string, any>,
  currentFieldKeys: string[],
  valueFormat: Record<string, any>
): boolean {
  const fieldConfig = elementsSource[fieldKey]
  const visibleStates = fieldConfig?.['#states']?.visible
  if (!visibleStates) return true

  // Résolution de la valeur de dépendance, selon où elle se trouve
  function getDependencyValue(depName: string) {
    if (currentFieldKeys.includes(depName)) {
      return watchedStepValues[depName]
    }
    return prevStepValues[depName]
  }

  // Cas objet classique
  if (!Array.isArray(visibleStates)) {
    return Object.entries(visibleStates as Record<string, any>).every(
      ([selector, conditions]) => {
        const match = selector.match(/:input\[name="([^"]+)"\]/)
        if (!match) return true
        const depName = match[1]
        const depConfig = elementsSource[depName]
        const depType = depConfig?.['#type']
        const format = valueFormat[depType] || 'key'
        const watched = getDependencyValue(depName)
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return checkVisibilityCondition(
            format,
            depConfig,
            watched,
            conditions.value
          )
        }
        return true
      }
    )
  }
  // Cas array (syntaxe avancée)
  return (visibleStates as any[]).some((stateCond: any) => {
    if (typeof stateCond !== 'object' || stateCond === null) return false
    return Object.entries(stateCond as Record<string, any>).every(
      ([selector, conditions]) => {
        const match = selector.match(/:input\[name="([^"]+)"\]/)
        if (!match) return true
        const depName = match[1]
        const depConfig = elementsSource[depName]
        const depType = depConfig?.['#type']
        const format = valueFormat[depType] || 'key'
        const watched = getDependencyValue(depName)
        if (watched === undefined) return false
        if (conditions.hasOwnProperty('value')) {
          return checkVisibilityCondition(
            format,
            depConfig,
            watched,
            conditions.value
          )
        }
        return true
      }
    )
  })
}

export type TDependentField = { name: string; type: string }

export function getDependentFields(
  elementsSource: Record<string, any>
): TDependentField[] {
  const depsMap = new Map<string, string>()

  Object.entries(elementsSource).forEach(([_, fieldConfig]) => {
    const visibleStates = fieldConfig?.['#states']?.visible
    if (!visibleStates) return
    if (Array.isArray(visibleStates)) {
      visibleStates.forEach((stateCond: any) => {
        if (typeof stateCond !== 'object' || stateCond === null) return
        Object.keys(stateCond).forEach((selector) => {
          const match = selector.match(/:input\[name="([^"]+)"\]/)
          if (match) {
            const depName = match[1]
            const depType = elementsSource[depName]?.['#type'] || 'unknown'
            depsMap.set(depName, depType)
          }
        })
      })
    } else {
      Object.keys(visibleStates).forEach((selector) => {
        const match = selector.match(/:input\[name="([^"]+)"\]/)
        if (match) {
          const depName = match[1]
          const depType = elementsSource[depName]?.['#type'] || 'unknown'
          depsMap.set(depName, depType)
        }
      })
    }
  })

  return Array.from(depsMap.entries()).map(([name, type]) => ({ name, type }))
}

export const generateFormSchemaAndDefaults = ({
  elementsSource,
  visibleElementsKeys,
  valueFormat,
  defaultFieldValues,
  defaultFieldStateMessages,
}: {
  elementsSource: Record<string, any>
  visibleElementsKeys: string[]
  valueFormat: Required<TWebformValueFormat>
  defaultFieldValues: Required<TWebformDefaultFieldValues>
  defaultFieldStateMessages: DeepRequired<TWebformStateMessages>
}) => {
  const defaults: Record<string, any> = {}
  const yupObjLocal: Record<string, any> = {}

  visibleElementsKeys.forEach((key) => {
    const field = elementsSource[key]
    const type: TDrupal_FieldType = field['#type']
    const required = field?.['#required']
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
      required: Boolean(required),
      valueFormat,
      defaultFieldValues,
      defaultFieldStateMessages,
      requiredMessage,
      errorMessage,
    })
  })

  return {
    defaultValues: defaults,
    validationSchema: yup.object().shape(yupObjLocal),
  }
}
