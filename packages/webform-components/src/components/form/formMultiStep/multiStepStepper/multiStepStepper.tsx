'use client'

import styles from './multiStepStepper.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepStepperProps } from '../../../../lib/types/components/multiStepStepper'
import { useMultiStepContext } from '../multiStepContext'

const MultiStepStepper = (props: IMultiStepStepperProps) => {
  const {
    multiStepTitleAs = 'span',
    currentStepObj,
    components,
    classNames,
  } = props

  const { stepIndex, totalSteps } = useMultiStepContext()

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
        stepIndex === 0
            ? minPercent
            : stepIndex === totalSteps - 1
                ? maxPercent
                : minPercent +
                ((maxPercent - minPercent) / (totalSteps - 1)) * stepIndex
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
          {stepIndex + 1}/{totalSteps}
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

export default React.memo(MultiStepStepper)
