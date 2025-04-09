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

export { mergeObjects }
