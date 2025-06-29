import React from 'react'
import FormMappingFields from '@/components/webform/form/formMappingFields/formMappingFields'
import { TElementSource } from '@/lib/types/components/field'
import { TWebformClassNames, TWebformValueFormat } from '@/lib/types/form.d'

type TFieldRendererProps = {
  control: any
  index: number
  fieldKey: string
  field: TElementSource
  isValid: boolean
  valueFormat: Required<TWebformValueFormat>
  components?: any
  classNames: Required<TWebformClassNames>
  isMultiStep: boolean
}

const FormFieldRendered = ({
  control,
  index,
  fieldKey,
  field,
  isValid,
  valueFormat,
  components,
  classNames,
  isMultiStep,
}: TFieldRendererProps) => {
  const type: string = field['#type'] ?? 'default'

  if (
    type !== 'select' &&
    type !== 'webform_actions' &&
    type !== 'textfield' &&
    type !== 'email' &&
    type !== 'textarea' &&
    type !== 'checkboxes' &&
    type !== 'managed_file' &&
    type !== 'tel' &&
    type !== 'radios' &&
    type !== 'number'
  ) {
    return null
  }

  const elementRenderer = FormMappingFields[type]?.element

  if (!elementRenderer) return null

  return elementRenderer({
    control,
    index,
    key: fieldKey,
    keyForMap: fieldKey,
    field,
    isValid,
    valueFormat,
    isMultiStep,
    components,
    classNames,
  })
}

export default React.memo(FormFieldRendered)
