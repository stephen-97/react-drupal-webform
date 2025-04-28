import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiyg'
import { IDescriptionProps } from '@/lib/types/components/description'

const Description = ({
  innerProps,
  custom_component_wysiwyg,
  processed,
}: IDescriptionProps) => {
  const CustomWysiwyg = custom_component_wysiwyg ?? Wysiwyg

  return <CustomWysiwyg processed={processed} as={'div'} {...innerProps} />
}

export default Description
