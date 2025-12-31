'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import Webform from '../../../../packages/react-drupal-webform/src/components/webform'
import { TWebformStateMessages } from '../../../../packages/react-drupal-webform/src/lib/types/form.d'
import CustomInput from '@/components/webform/custom-components/customInput'
import styles from './customWebform.module.scss'
import CustomLabel from '@/components/webform/custom-components/customLabel'
import CustomStepper from '@/components/webform/custom-components/customStepper'

export type TWebformContainer = {
  elementsSource: string
}

const CustomWebform = ({ elementsSource }: TWebformContainer) => {
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

  const defaultStateValues: TWebformStateMessages = {
    general: {
      errorMessage: 'Invalid value.',
      requiredMessage: 'tralalala',
    },
    fields: {
      errorMessages: {
        textarea: 'Please enter valid text.',
        email: 'Please enter a valid email address.',
        date: 'Please enter a valid date.',
        radios: 'Please select an option.',
        checkbox: 'This checkbox value is invalid.',
        checkboxes: 'Please select at least one option.',
        select: 'Please select a value.',
        managed_file: 'Please upload a valid file.',
        hidden: '',
      },
      requiredMessages: {
        textarea: 'This textarea is required.',
        email: 'Email is required.',
        number: 'Number is required.',
        tel: 'Phone number is required.',
        date: 'Date is required.',
        radios: 'Please choose one option.',
        checkbox: 'This checkbox must be checked.',
        checkboxes: 'Please select at least one option.',
        select: 'Please select a value.',
        managed_file: 'A file is required.',
        hidden: '',
      },
      minLengthMessages: {
        textfield: (props) => {
          const title = props?.['#title']
          const minLenght = props?.['#minlength']
          return `the field ${title} have a minimum of ${minLenght} characters`
        },
      },
    },
  }

  return (
    <div className={styles.customWebformContainer}>
      <Webform
        elementsSource={correctElementsSource}
        onSubmit={handleSubmit}
        components={{
          input: CustomInput,
          label: CustomLabel,
          multiStepStepper: CustomStepper,
        }}
      />
    </div>
  )
}
export default CustomWebform
