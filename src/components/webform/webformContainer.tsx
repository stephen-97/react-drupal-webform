'use client'

import Webform from '@/components/webform/webform'
import { UseFormProps } from 'react-hook-form'
import styles from './webformContainer.module.scss'

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
        select: 'keyValue',
        checkboxes: 'keyValue',
      }}
      defaultFieldValues={{
        textfield: '',
      }}
      classNames={{
        general: {
          fieldWrapper: styles.fieldWrapper,
          fieldLabel: styles.fieldLabel,
        },
        states: {
          fieldError: styles.fieldError,
          fieldErrorMessage: styles.fieldErrorMessage,
        },
        types: {
          textfield: styles.textfield,
          select: styles.select,
        },
      }}
      defaultStateMessages={{
        general: {
          errorMessage: 'Error Message is here',
          requiredMessage: 'Field is required',
        },
      }}
    />
  )
}

export default WebformContainer
