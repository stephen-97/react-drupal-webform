import { FIELD_TYPE_TO_GROUP } from '../const/const.form'
import cn from 'classnames'

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
  hasError,
  type,
  component,
}: {
  hasError?: boolean
  type?: string
  component?: string
}) => {
  const groupType = type ? FIELD_TYPE_TO_GROUP[type] : undefined

  return {
    ...(hasError !== undefined ? { 'data-has-error': hasError } : {}),
    ...(type ? { 'data-type': type } : {}),
    ...(groupType ? { 'data-group-type': groupType } : {}),
    ...(component ? { 'data-component': component } : {}),
  }
}

type TGetClassNamesParams = {
  name: string
  prefix?: string
  baseCn?: cn.Argument
}

export const getClassNames = ({
  name,
  prefix,
  baseCn,
}: TGetClassNamesParams): string => {
  const baseName = prefix ? `${prefix}-webform-${name}` : `webform-${name}`

  return cn(baseName, baseCn)
}
