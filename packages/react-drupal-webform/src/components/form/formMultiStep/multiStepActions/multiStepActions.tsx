import styles from './multiStepActions.module.scss'
import stylesField from '../../fields/field.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepActionsProps } from '../../../../lib/types/components/multiStepActions'
import Loader from '../../fields/fields-sub-components/loader/loader'
import { useFormContext } from 'react-hook-form'
import { useMultiStepContext } from '../multiStepContext'

const MultiStepActions = (props: IMultiStepActionsProps) => {
  const { previousButtonLabel, nextButtonLabel, components, classNames } = props

  const { formState, trigger } = useFormContext()
  const { stepIndex, totalVisibleSteps, goNext, goPrev } = useMultiStepContext()

  const { isSubmitting, isValid: isStepValid } = formState

  const CustomMultiStepActions = components?.multiStepActions
  if (CustomMultiStepActions) {
    return <CustomMultiStepActions {...props} />
  }

  const isLastStep = stepIndex === totalVisibleSteps - 1

  const handlePrev = () => {
    goPrev()
  }

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLastStep) {
      e.preventDefault()
      e.stopPropagation()

      const valid = await trigger()
      if (valid) {
        // ⚡ On passe les valeurs du step courant à goNext (le provider fera setAllWatchedSteps)
        goNext()
      }
    }
  }

  return (
    <div
      className={cn(
        styles.multiStepActions,
        classNames.multiStep.actionsContainer
      )}
    >
      {stepIndex > 0 && (
        <button
          className={cn(
            stylesField.button,
            styles.button,
            classNames.multiStep.actionsButtons,
            classNames.multiStep.actionsButtonPrev
          )}
          type="button"
          onClick={handlePrev}
        >
          {previousButtonLabel && previousButtonLabel.length > 0
            ? previousButtonLabel
            : 'Prev'}
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

export default React.memo(MultiStepActions)
