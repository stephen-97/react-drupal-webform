import React from 'react'
import { TitleProps } from '../../../../../lib/types/components/title'
import Help from '../help/help'
import cn from 'classnames'
import styles from './title.module.scss'

const Title = (props: TitleProps) => {
  const { field, components, className, classNames, fieldKey } = props
  const showHelp =
    Boolean(field['#help']?.length) || Boolean(field['#help_title']?.length)

  const CustomHelp = components?.help ?? Help
  const title = field?.['#title']
  const isRequired = field?.['#required']

  if (props.wrapperElement === 'label') {
    return (
      <label
        {...props.innerProps}
        htmlFor={fieldKey}
        className={cn(styles.title, className, classNames.general?.fieldTitle, {
          [styles.isRequired]: isRequired,
        })}
      >
        {title}
        {showHelp && (
          <CustomHelp
            field={field}
            classNames={classNames}
            components={components}
          />
        )}
      </label>
    )
  }

  return (
    <legend
      {...props.innerProps}
      className={cn(styles.title, className, props.innerProps?.className, {
        [styles.isRequired]: isRequired,
      })}
    >
      {title}
      {showHelp && (
        <CustomHelp
          field={field}
          classNames={classNames}
          components={components}
        />
      )}
    </legend>
  )
}

export default React.memo(Title)
