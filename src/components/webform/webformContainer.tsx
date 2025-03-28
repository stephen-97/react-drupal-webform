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
  const yupObject = {}
  const defaultValues = {}

  const yupUseFormProps: UseFormProps = {
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues,
  }

  return (
    <Webform
      elementsSource={elementsSource}
      confirmationPath={confirmationPath}
      yup={{ yupUseFormProps, yupObject, defaultValues }}
      valueFormat={{
        radio: 'value',
        select: 'keyValue',
        checkboxes: 'booleanMap',
      }}
    />
  )
}

export default WebformContainer
