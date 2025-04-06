'use client'

import Webform from '@/components/webform/webform'
import { UseFormProps } from 'react-hook-form'

export type TWebformContainer = {
  elementsSource: string
  confirmationPath: string
}

const WebformContainer = ({
  elementsSource,
  confirmationPath,
}: TWebformContainer) => {
  const yupUseFormProps: UseFormProps = {
    mode: 'onChange',
    reValidateMode: 'onBlur',
  }

  return (
    <Webform
      elementsSource={elementsSource}
      confirmationPath={confirmationPath}
      yup={{ yupUseFormProps }}
      valueFormat={{
        radio: 'value',
        select: 'booleanMap',
        checkboxes: 'key',
      }}
      defaultFieldValues={{
        textfield: '',
      }}
    />
  )
}

export default WebformContainer
