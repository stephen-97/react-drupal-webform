import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiyg'
import { IDescriptionProps } from '@/lib/types/components/description'

const Description = ({ innerProps, processed }: IDescriptionProps) => {
  return <Wysiwyg processed={processed} as={'div'} />
}

export default Description
