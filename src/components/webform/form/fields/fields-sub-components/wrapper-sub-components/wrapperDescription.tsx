import React from 'react'
import styles from '@/components/webform/form/fields/fields-sub-components/wrapper.module.scss'
import { TWrapperDescriptionWebformProps } from '@/lib/types/components/wrapperDescription'
import cn from 'classnames'
import Description from '@/components/webform/form/fields/fields-sub-components/description/description'

const WrapperDescription = ({
  components,
  classNames,
  field,
}: TWrapperDescriptionWebformProps) => {
  const CustomDescription = components?.description ?? Description

  return (
    <CustomDescription
      custom_component_wysiwyg={components.wysiwyg}
      innerProps={{
        className: cn(
          classNames.general.fieldDescription,
          styles.wysiwyg,
          classNames.general.fieldWysiwyg
        ),
      }}
      processed={
        (field?.['#description'] ?? field?.['#file_placeholder']) || ''
      }
    />
  )
}

export default React.memo(WrapperDescription)
