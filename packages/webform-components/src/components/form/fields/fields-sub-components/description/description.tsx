import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from "../../fields-special-components/wysiwyg/wysiwyg"
import { IDescriptionWebformProps } from "../../../../../lib/types/components/description"
import cn from 'classnames'

const Description = ({
  innerProps,
  custom_component_wysiwyg,
  processed,
}: IDescriptionWebformProps) => {
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
