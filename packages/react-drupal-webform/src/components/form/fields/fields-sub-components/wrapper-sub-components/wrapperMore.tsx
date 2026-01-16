import React from 'react'
import { TWrapperMoreWebformProps } from '../../../../../lib/types/components/wrapperMore'
import cn from 'classnames'
import styles from '../fieldContainer.module.scss'
import More from '../more/more'

const WrapperMore = ({
  components,
  classNames,
  fieldMore,
  fieldMoreTitle,
}: TWrapperMoreWebformProps) => {
  const CustomMore = components?.more ?? More

  return (
    <CustomMore
      innerPropsWysiwyg={{
        className: cn(styles.wysiwyg, classNames.general.fieldWysiwyg),
        processed: fieldMore,
        source: 'more',
      }}
      classNames={classNames}
      moreTitle={fieldMoreTitle}
      components={components}
    />
  )
}

export default React.memo(WrapperMore)
