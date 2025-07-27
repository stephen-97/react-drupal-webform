'use client'

import styles from './multiStepActions.module.scss'
import stylesField from '../../fields/field.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepActionsProps } from '@/lib/types/components/multiStepActions'

const MultiStepActions = (props: IMultiStepActionsProps) => {
  const {
    step,
    totalSteps,
    previousButtonLabel,
    isStepValid,
    nextButtonLabel,
    components,
    classNames,
    buttonsOnClick,
  } = props

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
        disabled={!isStepValid}
        type={isLastStep ? 'submit' : 'button'}
        onClick={() => (!isLastStep ? buttonsOnClick.next() : null)}
      >
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
