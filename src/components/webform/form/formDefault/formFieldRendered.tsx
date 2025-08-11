import React from 'react'
import FormMappingFields from '@/components/webform/form/formMappingFields/formMappingFields'
import { IFieldRendererWebformProps } from '@/lib/types/components/formFieldRendered'

const FormFieldRendered = ({
  control,
  index,
  fieldKey,
  field,
  formState,
  valueFormat,
  components,
  classNames,
  isMultiStep,
}: IFieldRendererWebformProps) => {
  const type: string = field['#type'] ?? 'default'

  const elementRenderer = FormMappingFields[type]?.element

  if (!elementRenderer) return null

  return elementRenderer({
    control,
    index,
    key: fieldKey,
    field,
    valueFormat,
    isMultiStep,
    components,
    classNames,
    formState,
  })
}

export default React.memo(FormFieldRendered)
