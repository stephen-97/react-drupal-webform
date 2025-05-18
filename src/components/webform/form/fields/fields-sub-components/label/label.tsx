import React from 'react'
import { ILabelWebformProps } from '@/lib/types/components/label'
import Help from '@/components/webform/form/fields/fields-sub-components/help/help'
import cn from 'classnames'
import styles from './label.module.scss'

const Label = ({
  title,
  innerProps,
  isRequired,
  innerPropsHelpComponent,
  custom_component_help,
}: ILabelWebformProps) => {
  const CustomHelp = custom_component_help ?? Help
  const { className, ...restInnerProps } = innerProps ?? {}

  return (
    <div className={cn(styles.labelContainer, className)} {...restInnerProps}>
      {title && (
        <label
          className={cn(styles.label, {
            [styles.isRequired]: isRequired,
          })}
        >
          {title}
        </label>
      )}
      {((innerPropsHelpComponent.helps?.help?.length ?? 0) > 0 ||
        (innerPropsHelpComponent.helps?.processed_help_title?.length ?? 0) >
          0) && <CustomHelp {...innerPropsHelpComponent} />}
    </div>
  )
}

export default Label
