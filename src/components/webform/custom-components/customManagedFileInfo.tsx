import React from 'react'
import { IManagedFileInfoProps } from 'webform-components/src/lib/types/components/managedFileInfo'

const CustomManagedFileInfo = ({ ...props }: IManagedFileInfoProps) => {
  return <div>{props.field?.['#file_extensions']}</div>
}
export default CustomManagedFileInfo
