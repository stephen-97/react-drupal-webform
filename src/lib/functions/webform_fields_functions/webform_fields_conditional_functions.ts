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
