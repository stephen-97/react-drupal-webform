import React from 'react'
import { WrapperMoreProps } from '../../../../../lib/types/components/wrapperMore'
import More from '../more/more'

const WrapperMore = ({
  components,
  classNamePrefix,
  field,
  fieldKey,
  unstyled,
}: WrapperMoreProps) => {
  const CustomMore = components?.more ?? More

  return (
    <CustomMore
      field={field}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
      components={components}
      unstyled={unstyled}
    />
  )
}

export default React.memo(WrapperMore)
