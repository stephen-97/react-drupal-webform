'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import { Webform } from 'webform-components'
import styles from './webformContainer.module.scss'
import ConfirmationInput from '@/components/webform/custom-components/confirmationInput'
import * as yup from 'yup'
import { TWebformCustomValidators } from 'webform-components/dist/lib/types/form.d'

export type TWebformContainer = {
  elementsSource: string
}

const WebformContainer = ({ elementsSource }: TWebformContainer) => {
  const fakeSubmit = (data: Record<any, string>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Formulaire soumis avec succès (fake).',
          data,
        })
      }, 3000)
    })
  }

  const handleSubmit = async (formData: Record<any, string>) => {
    console.log('YES HERE', formData)
    return fakeSubmit(formData)
      .then((response: any) => {
        console.log(formData)
        console.log(response.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const correctElementsSource = YAML.parse(elementsSource)

  const customValidator: TWebformCustomValidators = {
    byType: {
      textfield: () =>
        yup.string().min(3, 'Must contain at least 3 characters'),
    },
  }

  return (
    <Webform
      elementsSource={correctElementsSource}
      onSubmit={handleSubmit}
      includeInactiveFieldsInSubmit={false}
      components={{
        fieldById: {
          confirmation_du_chantier: ConfirmationInput,
          google_map: () => <div>hhe</div>,
        },
      }}
      customValidators={{
        byType: {
          textfield: () =>
            yup.string().min(3, 'Any textfield contain at least 3 characters'),
        },
        byId: {
          firstname: () =>
            yup
              .string()
              .min(3, 'First name must contain at least 3 characters'),
        },
      }}
      classNames={{
        wrappers: {
          base: styles.fieldWrapper,
          byCategory: {
            textInput: styles.fieldTextInput,
          },
          byFieldType: {
            textfield: styles.textfield,
          },
        },
        general: {
          fieldHelp: '',
        },
        states: {
          fieldError: styles.fieldError,
          fieldErrorMessage: styles.fieldErrorMessage,
        },
      }}
    />
  )
}

WebformContainer.whyDidYouRender = true
export default WebformContainer
