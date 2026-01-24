import React from 'react'
import { WrapperManagedFileInfoProps } from '../../../../../lib/types/components/WrapperManagedFileInfo'
import ManagedFileInfo from '../managedFileInfo/managedFileInfo'

const WrapperManagedFileInfo = ({
  field,
  components,
  fieldKey,
  classNamePrefix,
}: WrapperManagedFileInfoProps) => {
  const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo

  return (
    <CustomManagedFileInfo
      field={field}
      classNamePrefix={classNamePrefix}
      fieldKey={fieldKey}
    />
  )
}

export default React.memo(WrapperManagedFileInfo)
