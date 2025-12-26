import React from 'react'
import { TWrapperManagedFileInfoWebformProps } from "../../../../../lib/types/components/WrapperManagedFileInfo"
import ManagedFileInfo from "../managedFileInfo/managedFileInfo"

const WrapperManagedFileInfo = ({
  field,
  components,
}: TWrapperManagedFileInfoWebformProps) => {
  const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo

  return <CustomManagedFileInfo field={field} />
}

export default React.memo(WrapperManagedFileInfo)
