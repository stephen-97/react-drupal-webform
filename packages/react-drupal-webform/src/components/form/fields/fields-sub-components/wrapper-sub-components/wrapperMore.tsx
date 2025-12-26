import React from 'react'
import Label from "../label/label"
import { TWrapperLabelWebformProps } from "../../../../../lib/types/components/wrapperLabel"
import { TWrapperMoreWebformProps } from "../../../../../lib/types/components/wrapperMore"
import cn from 'classnames'
import styles from "../wrapper.module.scss"
import More from "../more/more"

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

export default React.memo(WrapperMore)
