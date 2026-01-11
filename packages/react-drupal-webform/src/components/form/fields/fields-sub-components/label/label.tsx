import React from 'react'
import { ILabelWebformProps } from '../../../../../lib/types/components/label'
import Help from '../help/help'
import cn from 'classnames'
import styles from './label.module.scss'

const Label = (props: ILabelWebformProps) => {
  const { field, components, className, classNames } = props
  const CustomHelp = components?.help ?? Help
  const title = field?.['#title']
  const isRequired = field?.['#required']

  if (props.wrapperElement === 'label') {
    return (
      <label
        {...props.innerProps}
        className={cn(styles.label, className, props.innerProps?.className, {
          [styles.isRequired]: isRequired,
        })}
      >
        {title}
        <CustomHelp
          field={field}
          classNames={classNames}
          components={components}
        />
      </label>
    )
  }

  return (
    <legend
      {...props.innerProps}
      className={cn(styles.label, className, props.innerProps?.className)}
    >
      {title}
      <CustomHelp
        field={field}
        classNames={classNames}
        components={components}
      />
    </legend>
  )
}

export default React.memo(Label)
