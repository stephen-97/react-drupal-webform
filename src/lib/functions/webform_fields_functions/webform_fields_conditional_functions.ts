import {
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

export const shouldFieldBeVisible = (
  fieldKey: string,
  elementsSource: Record<string, any>,
  watchedValues: Record<string, any>
): boolean => {
  const field = elementsSource[fieldKey]
  const visibleStates = field?.['#states']?.visible

  if (!visibleStates) return true

  return Object.entries(visibleStates).every(([selector, expectedRaw]) => {
    const match = selector.match(/:input\[name="([^"]+)"\]/)
    if (!match) return true

    const dependentKey = match[1]
    const currentValue = watchedValues[dependentKey]
    const expectedValue =
      typeof expectedRaw === 'object' &&
      expectedRaw !== null &&
      'value' in expectedRaw
        ? expectedRaw.value
        : expectedRaw

    return currentValue === expectedValue
  })
}

export const getDependentFields = (elementsSource: Record<string, any>) => {
  const deps = new Set<string>()

  Object.values(elementsSource).forEach((field) => {
    const visibleStates = field?.['#states']?.visible
    if (!visibleStates) return

    Object.keys(visibleStates).forEach((selector) => {
      const match = selector.match(/:input\[name="([^"]+)"\]/)
      if (match) deps.add(match[1])
    })
  })

  return Array.from(deps)
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
      type !== 'tel'
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
