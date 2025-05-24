import React from 'react'
import { TWrapperManagedFileInfoWebformProps } from '@/lib/types/components/WrapperManagedFileInfo'
import ManagedFileInfo from '@/components/webform/form/fields/fields-sub-components/managedFileInfo/managedFileInfo'

const WrapperManagedFileInfo = ({
  field,
  components,
}: TWrapperManagedFileInfoWebformProps) => {
  const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo

  return <CustomManagedFileInfo field={field} />
}

export default WrapperManagedFileInfo
