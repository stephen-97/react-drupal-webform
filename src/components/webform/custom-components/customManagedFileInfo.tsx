import React from 'react'
import { IHelpProps } from '@/lib/types/components/help'
import { IManagedFileInfoProps } from '@/lib/types/components/managedFileInfo'

const CustomManagedFileInfo = ({ ...props }: IManagedFileInfoProps) => {
  return <div>{props.field?.['#file_extensions']}</div>
}
export default CustomManagedFileInfo
