import styles from './multiStepStepper.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepStepperProps } from '@/lib/types/components/multiStepStepper'

const MultiStepActions = (props: IMultiStepStepperProps) => {
  const {
    step,
    multiStepTitleAs = 'span',
    currentStepObj,
    totalSteps,
    components,
    classNames,
  } = props

  const CustomMultiStepStepper = components?.multiStepStepper

  if (CustomMultiStepStepper) {
    return <CustomMultiStepStepper {...props} />
  }

  const TagTitle = multiStepTitleAs
  const title: string | undefined = currentStepObj?.['#title']

  const minPercent = 3
  const maxPercent = 100

  let percent = minPercent
  if (totalSteps > 1) {
    percent =
      step === 0
        ? minPercent
        : step === totalSteps - 1
          ? maxPercent
          : minPercent + ((maxPercent - minPercent) / (totalSteps - 1)) * step
  }

  return (
    <div
      className={cn(
        styles.multiStepStepper,
        classNames.multiStep.stepperContainer
      )}
    >
      <div
        className={cn(
          styles.headerStepperContainer,
          classNames.multiStep?.stepperHeader
        )}
      >
        {title && title.length > 0 && (
          <TagTitle
            className={cn(styles.title, classNames.multiStep.stepperTitle)}
          >
            {title}
          </TagTitle>
        )}
        <span
          className={cn(
            styles.multiStepStepperCounter,
            classNames.multiStep.stepperCounter
          )}
        >
          {step + 1}/{totalSteps}
        </span>
      </div>
      <div
        className={cn(
          styles.progressBarContainer,
          classNames.multiStep.stepperProgressBarContainer
        )}
      >
        <div
          className={cn(
            styles.progressBar,
            classNames.multiStep.stepperProgressBar
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default React.memo(MultiStepActions)
