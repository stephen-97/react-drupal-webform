import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg'
import { IDescriptionWebformProps } from '../../../../../lib/types/components/description'

const Description = ({
  innerProps,
  components,
  processed,
}: IDescriptionWebformProps) => {
  const CustomWysiwyg = components.wysiwyg ?? Wysiwyg
  const { className, ...restInnerProps } = innerProps ?? {}
  return (
    <CustomWysiwyg
      className={className}
      processed={processed}
      as={'div'}
      source={'description'}
      {...restInnerProps}
    />
  )
}

export default Description
