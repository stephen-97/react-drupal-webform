'use client'

import React from 'react'
import styles from './customMultiStepActions.module.scss'
import { IMultiStepActionsProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/multiStepActions'
import Loader from '../../../../packages/react-drupal-webform/src/components/form/fields/fields-sub-components/loader/loader'
import { useMultiStepContext } from '../../../../packages/react-drupal-webform/src/components/form/formMultiStep/multiStepContext'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'
const CustomMultiStepActions = (props: IMultiStepActionsProps) => {
  const { previousButtonLabel, nextButtonLabel } = props
  const { formState, trigger } = useFormContext()
  const { stepIndex, totalVisibleSteps, goNext, goPrev } = useMultiStepContext()
  const { isSubmitting, isValid: isStepValid } = formState

  const isLastStep = stepIndex === totalVisibleSteps - 1

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLastStep) {
      e.preventDefault()
      e.stopPropagation()

      const valid = await trigger()
      if (valid) {
        goNext()
      }
    }
  }

  return (
    <div className={styles.customMultiStepActions}>
      {stepIndex > 0 && (
        <button
          className={cn(styles.button, styles.prev)}
          type="button"
          onClick={() => goPrev()}
        >
          {previousButtonLabel && previousButtonLabel.length > 0
            ? previousButtonLabel
            : 'Prev'}
        </button>
      )}

      <button
        className={cn(styles.button, styles.next)}
        disabled={!isStepValid || isSubmitting}
        type={isLastStep ? 'submit' : 'button'}
        onClick={handleNext}
      >
        {isSubmitting && <Loader />}
        {isLastStep
          ? 'Submit'
          : nextButtonLabel && nextButtonLabel.length > 0
            ? nextButtonLabel
            : 'Next'}
      </button>
    </div>
  )
}

export default React.memo(CustomMultiStepActions)
