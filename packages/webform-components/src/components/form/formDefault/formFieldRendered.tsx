import React from 'react'
import FormMappingFields from '../formMappingFields/formMappingFields'
import { IFieldRendererWebformProps } from '../../../lib/types/components/formFieldRendered'

const FormFieldRendered = ({
  index,
  fieldKey,
  field,
  valueFormat,
  components,
  classNames,
  isMultiStep,
  watchedValues,
}: IFieldRendererWebformProps) => {
  const type: string = field['#type'] ?? 'default'

  const elementRenderer = FormMappingFields[type]?.element
  if (!elementRenderer) return null

  const isLayout = [
    'webform_section',
    'webform_flexbox',
    'container',
    'details',
  ].includes(type)

  return elementRenderer({
    index,
    key: fieldKey,
    field,
    valueFormat,
    isMultiStep,
    components,
    classNames,
    ...(isLayout ? { watchedValues } : {}),
  })
}

export default React.memo(FormFieldRendered)
