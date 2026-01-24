import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import React from 'react'
import ManagedFile from './fields-elements/managedFile'
const renderManagedFile = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, classNamePrefix } = props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomManagedFile =
    components?.fieldById?.[fieldKey] ?? components?.managedFile ?? ManagedFile

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
    >
      <CustomManagedFile {...props} />
    </FieldContainerComponent>
  )
}

export default renderManagedFile
