import { FIELD_TYPE_TO_GROUP } from '../const/const.form'
import cn from 'classnames'
import { HTMLInputTypeAttribute } from 'react'
import { TElementSource } from '../types/components/field'
import { StringSchema } from 'yup'

const mergeObjects = (
  defaultObj: Record<string, any>,
  newObj: Record<string, any>
) => {
  if (!defaultObj || !newObj) return defaultObj || newObj

  return Object.keys(defaultObj).reduce(
    (acc: Record<any, any>, key: string) => {
      if (
        typeof defaultObj[key] === 'object' &&
        typeof newObj[key] === 'object'
      ) {
        acc[key] = mergeObjects(defaultObj[key], newObj[key])
      } else {
        acc[key] = newObj[key] || defaultObj[key]
      }
      return acc
    },
    {}
  )
}

const deepMergeDefaults = <T extends object>(
  defaults: T,
  overrides: Partial<T>
): T =>
  Object.keys(defaults as object).reduce(
    (acc, key) => {
      const k = key as keyof T
      const defaultValue = defaults[k]
      const overrideValue = overrides?.[k]

      acc[k] =
        defaultValue !== null &&
        typeof defaultValue === 'object' &&
        !Array.isArray(defaultValue)
          ? deepMergeDefaults(defaultValue, (overrideValue ?? {}) as any)
          : overrideValue !== undefined
            ? overrideValue
            : defaultValue

      return acc
    },
    Array.isArray(defaults) ? ([] as any) : ({} as T)
  )

export { mergeObjects, deepMergeDefaults }

export const getDataAttributes = ({
  type,
  component,
}: {
  type?: string
  component?: string
}) => {
  const groupType = type ? FIELD_TYPE_TO_GROUP[type] : undefined

  return {
    ...(type ? { 'data-type': type } : {}),
    ...(groupType ? { 'data-group-type': groupType } : {}),
    ...(component ? { 'data-component': component } : {}),
  }
}

export const getClassNames = ({
  name,
  prefix,
  unstyled,
  classNameComponent,
  baseCn,
  modifiers,
}: {
  name: string
  prefix: string | null | undefined
  unstyled: boolean
  classNameComponent?: string
  baseCn?: cn.Argument
  modifiers?: Record<string, boolean>
}): string => {
  const baseName = prefix ? `${prefix}-webform-${name}` : `webform-${name}`

  const modifierClasses = modifiers
    ? Object.fromEntries(
        Object.entries(modifiers).map(([key, value]) => [
          `${baseName}--${key}`,
          value,
        ])
      )
    : undefined

  return cn(
    baseName,
    modifierClasses,
    unstyled ? undefined : baseCn,
    classNameComponent
  )
}

export const getAriaDescribedBy = ({
  fieldKey,
  field,
}: {
  fieldKey: string
  field?: Record<string, any>
}): string | undefined => {
  const hasDescription =
    Boolean(field?.['#description']) || Boolean(field?.['#file_placeholder'])

  return hasDescription ? `description-${fieldKey}` : undefined
}

export const getTextLikeInputAttributes = (
  field: TElementSource,
  type: HTMLInputTypeAttribute
) => {
  const normalizeHtmlDate = (value: string): string => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value
    }
    const match = value.match(/^(\d{2})[\/-](\d{2})[\/-](\d{4})$/)

    if (match) {
      const [, day, month, year] = match
      return `${year}-${month}-${day}`
    }

    return value
  }

  const attrs: Record<string, any> = {}

  if (field['#placeholder']) {
    attrs.placeholder = field['#placeholder']
  }

  if (field['#required']) {
    attrs.required = true
  }

  if (['text', 'email', 'tel', 'password'].includes(type)) {
    if (field['#minlength'] != null) {
      attrs.minLength = field['#minlength']
    }

    if (field['#maxlength'] != null) {
      attrs.maxLength = field['#maxlength']
    }

    if (field['#size'] != null) {
      attrs.size = field['#size']
    }
  }

  if (field['#pattern'] && ['text', 'tel', 'password'].includes(type)) {
    attrs.pattern = field['#pattern']
  }

  if (type === 'number') {
    if (field['#min'] != null) {
      attrs.min = field['#min']
    }

    if (field['#max'] != null) {
      attrs.max = field['#max']
    }
  }

  if (type === 'date') {
    if (field?.['#date_date_min'] != null) {
      attrs.min = normalizeHtmlDate(field['#date_date_min'])
    }

    if (field?.['#date_date_max'] != null) {
      attrs.max = normalizeHtmlDate(field['#date_date_max'])
    }
  }

  return attrs
}

export const applyPatternIfApplicable = ({
  schema,
  field,
  fallbackMessage,
}: {
  schema: StringSchema
  field?: TElementSource
  fallbackMessage?: string
}): StringSchema => {
  const pattern = field?.['#pattern']
  if (!pattern) return schema

  const errorMessage: any = field?.['#pattern_error'] || fallbackMessage

  try {
    const regex = new RegExp(pattern)

    return schema.test('pattern', errorMessage, (value) => {
      if (!value) return true
      return regex.test(value)
    })
  } catch {
    return schema
  }
}
