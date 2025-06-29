'use client'

import styles from './multiStepActions.module.scss'
import stylesField from '../../fields/field.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepActionsProps } from '@/lib/types/components/multiStepActions'

const MultiStepActions = (props: IMultiStepActionsProps) => {
  const {
    step,
    previousButtonLabel,
    isStepValid,
    nextButtonLabel,
    goPrev,
    components,
    classNames,
  } = props

  const CustomMultiStepActions = components?.multiStepActions

  if (CustomMultiStepActions) {
    return <CustomMultiStepActions {...props} />
  }

  console.log('a', classNames.multiStep.actionsButtonPrev)
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
          onClick={goPrev}
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
        type="submit"
      >
        {nextButtonLabel && nextButtonLabel?.length > 0
          ? nextButtonLabel
          : 'Next'}
      </button>
    </div>
  )
}

export default React.memo(MultiStepActions)
