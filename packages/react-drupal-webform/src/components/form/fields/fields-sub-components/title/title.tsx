import React from 'react'
import cn from 'classnames'
import styles from './title.module.scss'
import { TitleProps } from '../../../../../lib/types/components/title'
import Help from '../help/help'
import { getClassNames } from '../../../../../lib/functions/utils_functions'
import { getDataAttributes } from '../../../../../lib/functions/utils_functions'

const Title = (props: TitleProps) => {
  const { field, components, className, fieldKey, innerProps, wrapperElement } =
    props

  const title = field?.['#title']
  const isRequired = Boolean(field?.['#required'])

  const showHelp =
    Boolean(field?.['#help']?.length) || Boolean(field?.['#help_title']?.length)

  const CustomHelp = components?.help ?? Help

  const titleClassNames = getClassNames({
    name: 'fieldTitle',
    baseCn: cn(styles.title, className, {
      [styles.isRequired]: isRequired,
    }),
  })

  const dataAttributes = getDataAttributes({
    component: 'title',
  })

  if (wrapperElement === 'label') {
    return (
      <label
        htmlFor={fieldKey}
        className={titleClassNames}
        {...dataAttributes}
        {...innerProps}
      >
        {title}
        {showHelp && <CustomHelp field={field} components={components} />}
      </label>
    )
  }

  return (
    <legend className={titleClassNames} {...dataAttributes} {...innerProps}>
      {title}
      {showHelp && <CustomHelp field={field} components={components} />}
    </legend>
  )
}

export default React.memo(Title)
