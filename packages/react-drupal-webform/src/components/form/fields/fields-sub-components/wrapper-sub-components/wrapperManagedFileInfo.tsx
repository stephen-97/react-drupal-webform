import React from 'react'
import { WrapperManagedFileInfoProps } from '../../../../../lib/types/components/wrapperManagedFileInfo'
import ManagedFileInfo from '../managedFileInfo/managedFileInfo'

const WrapperManagedFileInfo = ({
  field,
  components,
  fieldKey,
  classNamePrefix,
  unstyled,
}: WrapperManagedFileInfoProps) => {
  const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo

  return (
    <CustomManagedFileInfo
      components={components}
      field={field}
      classNamePrefix={classNamePrefix}
      fieldKey={fieldKey}
      unstyled={unstyled}
    />
  )
}

export default React.memo(WrapperManagedFileInfo)
