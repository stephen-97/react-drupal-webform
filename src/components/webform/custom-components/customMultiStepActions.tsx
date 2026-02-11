'use client'

import React from 'react'
import { MultiStepActionsProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/multiStepActions'
import styles from './customMultiStepActions.module.scss'
import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
const CustomMultiStepActions = (props: MultiStepActionsProps) => {
  const { previousButtonLabel, nextButtonLabel, multiStepContext } = props

  const { stepIndex, totalVisibleSteps, goNext, goPrev } = multiStepContext
  const { formState, trigger } = useFormContext()
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
        {isSubmitting && <span className={styles.loader} />}
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
