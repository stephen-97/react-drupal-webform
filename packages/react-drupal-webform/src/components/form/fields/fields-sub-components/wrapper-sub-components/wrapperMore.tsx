import React from 'react'
import { TWrapperMoreWebformProps } from '../../../../../lib/types/components/wrapperMore'
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
