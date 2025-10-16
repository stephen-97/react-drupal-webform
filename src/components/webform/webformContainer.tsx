'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import { Webform } from '../../../packages/webform-components'
import styles from './webformContainer.module.scss'
import { customValidatorObj } from '@/components/webform/custom-data/customValidatorObj'
import CustomMultiStepActions from '@/components/webform/custom-components/customMultiStepActions'

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
    console.log('result', formData)
    return fakeSubmit(formData)
      .then((response: any) => {
        console.log(response.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const correctElementsSource = YAML.parse(elementsSource)

  console.log(correctElementsSource)
  return (
    <Webform
      elementsSource={correctElementsSource}
      onSubmit={(data) => handleSubmit(data)}
      includeInactiveFieldsInSubmit={false}
      components={{
        fieldById: {
          identification_du_chantier: () => <div>test</div>,
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
