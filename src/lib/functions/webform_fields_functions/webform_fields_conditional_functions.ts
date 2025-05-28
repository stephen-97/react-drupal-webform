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

  return Object.entries(visibleStates).every(
    ([selector, conditions]: [string, any]) => {
      const match = selector.match(/:input\[name="([^"]+)"\]/)
      if (!match) {
        return true
      }

      const depName = match[1]
      const depConfig = elementsSource[depName]
      const depType = depConfig?.['#type']
      const format = valueFormat[depType] || 'key'
      const watched = watchedValues[depName]
      const options = depConfig?.['#options'] || {}

      if (watched === undefined) return false

      if (conditions.hasOwnProperty('value')) {
        const expectedKey: string = conditions.value

        switch (format) {
          case 'key':
            return watched === expectedKey

          case 'value':
            const expectedValue = options[expectedKey] ?? expectedKey
            return watched === expectedValue

          case 'keyValue':
            if (typeof watched !== 'object' || watched === null) return false
            if (Array.isArray(expectedKey)) {
              return expectedKey.every(
                (key: string) =>
                  key in watched &&
                  (watched as Record<string, any>)[key] === options[key]
              )
            }
            return (
              expectedKey in (watched as Record<string, any>) &&
              (watched as Record<string, any>)[expectedKey] ===
                options[expectedKey]
            )

          case 'booleanMap':
            if (typeof watched !== 'object' || watched === null) return false
            if (Array.isArray(expectedKey)) {
              return expectedKey.every((k: string) => watched[k] === true)
            }
            return watched[expectedKey] === true

          default:
            return true
        }
      }
      return true
    }
  )
}

export type TDependentField = { name: string; type: string }

export function getDependentFields(
  elementsSource: Record<string, any>
): TDependentField[] {
  const depsMap = new Map<string, string>()

  Object.entries(elementsSource).forEach(([_, fieldConfig]) => {
    const visibleStates = fieldConfig?.['#states']?.visible
    if (!visibleStates) return

    Object.keys(visibleStates).forEach((selector) => {
      const match = selector.match(/:input\[name="([^"]+)"\]/)
      if (match) {
        const depName = match[1]
        const depType = elementsSource[depName]?.['#type'] || 'unknown'
        depsMap.set(depName, depType)
      }
    })
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

    if (
      type !== 'select' &&
      type !== 'webform_actions' &&
      type !== 'textfield' &&
      type !== 'checkboxes' &&
      type !== 'managed_file' &&
      type !== 'radios' &&
      type !== 'tel' &&
      type !== 'number'
    ) {
      return
    }

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
