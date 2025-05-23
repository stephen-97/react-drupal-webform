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

  const filteredInnerProps = Object.fromEntries(
    Object.entries(innerProps ?? {}).filter(
      ([_, value]) => value !== '' && value !== undefined
    )
  )

  const { className, ...restInnerProps } = filteredInnerProps ?? {}

  return (
    <label
      className={cn(styles.label, className, {
        [styles.isRequired]: isRequired,
      })}
      {...restInnerProps}
    >
      {title}
      {((innerPropsHelpComponent.helps?.help?.length ?? 0) > 0 ||
        (innerPropsHelpComponent.helps?.processed_help_title?.length ?? 0) >
          0) && <CustomHelp {...innerPropsHelpComponent} />}
    </label>
  )
}

export default Label
