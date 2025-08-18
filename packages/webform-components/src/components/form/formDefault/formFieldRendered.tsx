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
}: IFieldRendererWebformProps) => {
  const type: string = field['#type'] ?? 'default'

  const elementRenderer = FormMappingFields[type]?.element

  if (!elementRenderer) return null

  return elementRenderer({
    index,
    key: fieldKey,
    field,
    valueFormat,
    isMultiStep,
    components,
    classNames,
  })
}

export default React.memo(FormFieldRendered)
