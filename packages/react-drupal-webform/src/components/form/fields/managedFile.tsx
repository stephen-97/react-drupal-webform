import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import React from 'react'
import ManagedFile from './fields-elements/managedFile'
const renderManagedFile = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props

  const CustomManagedFile =
    components?.fieldById?.[fieldKey] ?? components?.managedFile ?? ManagedFile

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      components={components}
      classNameFieldName="fieldInput"
      key={fieldKey}
      fieldKey={fieldKey}
    >
      <CustomManagedFile {...props} />
    </Wrapper>
  )
}

export default renderManagedFile
