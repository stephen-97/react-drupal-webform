import React from 'react'
import FormMappingFields from '../formMappingFields/formMappingFields'
import { IFieldRendererWebformProps } from '../../../lib/types/components/formFieldRendered'
import { getAriaDescribedBy } from '../../../lib/functions/utils_functions'

const FormFieldRendered = ({
  index,
  fieldKey,
  field,
  components,
  classNames,
  isMultiStep,
  watchedValues,
  classNamePrefix,
}: IFieldRendererWebformProps) => {
  const rawType = field['#type']
  const type = rawType in FormMappingFields ? rawType : 'default'

  const elementRenderer = FormMappingFields[type]?.element
  if (!elementRenderer) return null

  const isLayout = [
    'webform_section',
    'webform_flexbox',
    'container',
    'details',
    'fieldset',
  ].includes(type)

  const ariaDescribedBy = getAriaDescribedBy({ fieldKey, field })

  return elementRenderer({
    index,
    fieldKey,
    field,
    isMultiStep,
    components,
    classNames,
    ariaDescribedBy,
    classNamePrefix,
    ...(isLayout ? { watchedValues } : {}),
  })
}

export default React.memo(FormFieldRendered)
