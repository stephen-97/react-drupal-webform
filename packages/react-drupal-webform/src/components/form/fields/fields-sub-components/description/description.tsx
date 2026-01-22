import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg'
import { DescriptionProps } from '../../../../../lib/types/components/description'
import cn from 'classnames'
import styles from '../fieldContainer.module.scss'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const Description = ({
  innerProps,
  components,
  classNames,
  field,
  className,
}: DescriptionProps) => {
  const CustomWysiwyg = components.wysiwyg ?? Wysiwyg

  const descriptionClassNames = getClassNames({
    name: 'description',
    baseCn: cn(styles.wysiwyg, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'description',
  })

  return (
    <CustomWysiwyg
      className={descriptionClassNames}
      processed={
        (field?.['#description'] ?? field?.['#file_placeholder']) || ''
      }
      as={'div'}
      source={'description'}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default Description
