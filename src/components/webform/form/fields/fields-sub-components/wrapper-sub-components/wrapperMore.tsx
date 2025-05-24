import React from 'react'
import Label from '@/components/webform/form/fields/fields-sub-components/label/label'
import { TWrapperLabelWebformProps } from '@/lib/types/components/wrapperLabel'
import { TWrapperMoreWebformProps } from '@/lib/types/components/wrapperMore'
import cn from 'classnames'
import styles from '@/components/webform/form/fields/fields-sub-components/wrapper.module.scss'
import More from '@/components/webform/form/fields/fields-sub-components/more/more'

const WrapperMore = ({
  components,
  classNames,
  fieldMore,
  fieldMoreTitle,
}: TWrapperMoreWebformProps) => {
  const CustomMore = components?.more ?? More

  return (
    <CustomMore
      innerPropsContainer={{
        className: classNames.general.fieldMore,
      }}
      innerPropsWysiwyg={{
        className: cn(styles.wysiwyg, classNames.general.fieldWysiwyg),
        processed: fieldMore,
      }}
      customComponentWysiwyg={components.wysiwyg}
      moreTitle={fieldMoreTitle}
    />
  )
}

export default WrapperMore
