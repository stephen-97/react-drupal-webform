'use client'

import styles from './multiStepActions.module.scss'
import stylesField from '../../fields/field.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepActionsProps } from '@/lib/types/components/multiStepActions'
import Loader from '@/components/webform/form/fields/fields-sub-components/loader/loader'

const MultiStepActions = (props: IMultiStepActionsProps) => {
  const {
    step,
    totalSteps,
    previousButtonLabel,
    nextButtonLabel,
    components,
    classNames,
    buttonsOnClick,
    formState,
  } = props

  const { isSubmitting, isValid: isStepValid } = formState

  const CustomMultiStepActions = components?.multiStepActions

  if (CustomMultiStepActions) {
    return <CustomMultiStepActions {...props} />
  }

  const isLastStep = step === totalSteps - 1

  return (
    <div
      className={cn(
        styles.multiStepActions,
        classNames.multiStep.actionsContainer
      )}
    >
      {step > 0 && (
        <button
          className={cn(
            stylesField.button,
            styles.button,
            classNames.multiStep.actionsButtons,
            classNames.multiStep.actionsButtonPrev
          )}
          type="button"
          onClick={buttonsOnClick.prev}
        >
          {previousButtonLabel && previousButtonLabel.length > 0
            ? previousButtonLabel
            : 'prev'}
        </button>
      )}
      <button
        className={cn(
          stylesField.button,
          styles.button,
          classNames.multiStep.actionsButtons,
          classNames.multiStep.actionsButtonsNext
        )}
        disabled={!isStepValid || isSubmitting}
        type={isLastStep ? 'submit' : 'button'}
        onClick={(e) => {
          if (!isLastStep) {
            e.preventDefault()
            e.stopPropagation()
            buttonsOnClick.next()
          }
        }}
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

export default React.memo(MultiStepActions)
