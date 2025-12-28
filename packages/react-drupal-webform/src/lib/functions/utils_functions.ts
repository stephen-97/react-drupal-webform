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

export const toStringMessage = (value: any): string => {
  if (typeof value === 'function') return ''
  return value ?? ''
}
