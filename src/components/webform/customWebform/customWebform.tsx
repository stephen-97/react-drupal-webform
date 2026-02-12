'use client'

import YAML from 'yaml'

import { useState } from 'react'
import Webform from '../../../../packages/react-drupal-webform/src/components/webform'
import styles from './customWebform.module.scss'
import CustomLabel from '@/components/webform/custom-components/customLabel'
import CustomStepper from '@/components/webform/custom-components/customStepper'
import CustomMultiStepActions from '@/components/webform/custom-components/customMultiStepActions'
import CustomSelect from '@/components/webform/custom-components/customSelect'
import CustomMore from '@/components/webform/custom-components/customMore'
import CustomWysiwyg from '@/components/webform/custom-components/customWysiwyg'
import { rhfCustomValidators } from '@/components/webform/customWebform/custom-objects'
import CustomAction from '@/components/webform/custom-components/customAction'
import CustomHelp from '@/components/webform/custom-components/CustomHelp'
import CustomForm from '@/components/webform/custom-components/customForm'
import CustomUnsupportedField from '@/components/webform/custom-components/unsupportedField'
import ConfirmationView from '@/components/webform/customWebform/confirmationView'
import CustomInput from '@/components/webform/custom-components/customInput'

export type TWebformContainer = {
  elementsSource: string
  validationEngine?: 'html' | 'rhf'
}

const CustomWebform = ({ elementsSource }: TWebformContainer) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const fakeSubmit = (data: Record<any, string>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Formulaire soumis avec succès.',
          data,
        })
      }, 3000)
    })
  }

  const handleSubmit = async (formData: Record<any, string>) => {
    return fakeSubmit(formData)
      .then(() => {
        setIsSubmitted(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const correctElementsSource = YAML.parse(elementsSource)

  if (isSubmitted) {
    return (
      <div className={styles.customWebformContainer}>
        <ConfirmationView />
      </div>
    )
  }

  return (
    <div className={styles.customWebformContainer}>
      <Webform
        elementsSource={correctElementsSource}
        onSubmit={handleSubmit}
        className={styles.customWebformForm}
        rhfCustomValidators={rhfCustomValidators}
        components={{
          input: CustomInput,
          title: CustomLabel,
          multiStepStepper: CustomStepper,
          multiStepActions: CustomMultiStepActions,
          select: CustomSelect,
          more: CustomMore,
          wysiwyg: CustomWysiwyg,
          action: CustomAction,
          unsupportedField: CustomUnsupportedField,
          help: CustomHelp,
          form: CustomForm,
        }}
        validationEngine={'rhf'}
        rhfValidationMode={'all'}
      />
    </div>
  )
}

export default CustomWebform
