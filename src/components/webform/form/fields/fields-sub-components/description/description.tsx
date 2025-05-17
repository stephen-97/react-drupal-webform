import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiwyg/wysiwyg'
import { IDescriptionProps } from '@/lib/types/components/description'
import cn from 'classnames'

const Description = ({
  innerProps,
  custom_component_wysiwyg,
  processed,
}: IDescriptionProps) => {
  const CustomWysiwyg = custom_component_wysiwyg ?? Wysiwyg
  const { className, ...restInnerProps } = innerProps ?? {}
  return (
    <CustomWysiwyg
      className={className}
      processed={processed}
      as={'div'}
      {...restInnerProps}
    />
  )
}

export default Description
