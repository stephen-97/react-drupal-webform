'use client'

import Webform from '@/components/webform/webform'
import { UseFormProps } from 'react-hook-form'
import styles from './webformContainer.module.scss'
import LabelCustom from '@/components/webform/custom-components/LabelCustom'
import errorMessageCustom from '@/components/webform/custom-components/errorMessageCustom'
import wrapperCustom from '@/components/webform/custom-components/wrapperCustom'
import CustomEmail from '@/components/webform/custom-components/customEmail'

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
      components={{
        label: LabelCustom,
        errorFieldMessage: errorMessageCustom,
        wrapper: wrapperCustom,
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
      defaultFieldStateMessages={{
        general: {
          errorMessage: 'Error Message is here',
          requiredMessage: 'Field is required NO',
        },
        fields: {
          errorMessages: {
            email: 'Wrong email',
          },
          requiredMessages: {
            textfield: 'The textfield is required',
            textarea: 'Textarea is required',
          },
        },
      }}
    />
  )
}

export default WebformContainer
