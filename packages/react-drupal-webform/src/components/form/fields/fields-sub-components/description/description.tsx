import React from 'react'
import 'tippy.js/dist/tippy.css'
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg'
import { DescriptionProps } from '../../../../../lib/types/components/description'
import cn from 'classnames'
import styles from '../fieldContainer.module.scss'

const Description = ({
  innerProps,
  components,
  classNames,
  field,
  className,
}: DescriptionProps) => {
  const CustomWysiwyg = components.wysiwyg ?? Wysiwyg
  return (
    <CustomWysiwyg
      className={cn(
        classNames.general?.fieldDescription,
        styles.wysiwyg,
        classNames.general?.fieldWysiwyg,
        className
      )}
      processed={
        (field?.['#description'] ?? field?.['#file_placeholder']) || ''
      }
      as={'div'}
      source={'description'}
      {...innerProps}
    />
  )
}

export default Description
