import React from 'react'
import { WrapperMoreProps } from '../../../../../lib/types/components/wrapperMore'
import More from '../more/more'

const WrapperMore = ({
  components,
  classNames,
  classNamePrefix,
  field,
  fieldKey,
}: WrapperMoreProps) => {
  const CustomMore = components?.more ?? More

  return (
    <CustomMore
      field={field}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
      classNames={classNames}
      components={components}
    />
  )
}

export default React.memo(WrapperMore)
