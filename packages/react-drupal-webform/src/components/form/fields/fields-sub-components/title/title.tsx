import React from 'react'
import cn from 'classnames'
import styles from './title.module.scss'
import { TitleProps } from '../../../../../lib/types/components/title'
import Help from '../help/help'
import { getClassNames } from '../../../../../lib/functions/utils_functions'
import { getDataAttributes } from '../../../../../lib/functions/utils_functions'

const Title = (props: TitleProps) => {
  const {
    field,
    components,
    className,
    fieldKey,
    innerProps,
    wrapperElement,
    classNamePrefix,
    classNames,
  } = props

  const title = field?.['#title']
  const isRequired = Boolean(field?.['#required'])

  const showHelp =
    Boolean(field?.['#help']?.length) || Boolean(field?.['#help_title']?.length)

  const CustomHelp = components?.help ?? Help

  const isInvisible = field?.['#title_display'] === 'invisible'

  const titleClassNames = getClassNames({
    name: 'title',
    prefix: classNamePrefix,
    modifiers: {
      invisible: isInvisible,
    },
    baseCn: cn(styles.title, className, {
      [styles.isRequired]: isRequired,
      [styles.visuallyHidden]: isInvisible,
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
        {showHelp && (
          <CustomHelp
            fieldKey={fieldKey}
            field={field}
            components={components}
            classNames={classNames}
            classNamePrefix={classNamePrefix}
          />
        )}
      </label>
    )
  }

  return (
    <legend className={titleClassNames} {...dataAttributes} {...innerProps}>
      {title}
      {showHelp && (
        <CustomHelp
          fieldKey={fieldKey}
          field={field}
          components={components}
          classNames={classNames}
          classNamePrefix={classNamePrefix}
        />
      )}
    </legend>
  )
}

export default React.memo(Title)
