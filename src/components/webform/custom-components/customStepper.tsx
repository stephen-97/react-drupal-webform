'use client'

import React from 'react'
import cn from 'classnames'
import styles from './customStepper.module.scss'
import { MultiStepStepperProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/multiStepStepper'

const CustomStepper = (props: MultiStepStepperProps) => {
  const { elementsSource, multiStepContext } = props

  const { stepIndex } = multiStepContext

  const steps = Object.entries(elementsSource)

  return (
    <div className={styles.stepper}>
      {steps.map(([key, step], index) => {
        const isActive = index === stepIndex
        const isCompleted = index < stepIndex

        return (
          <div key={key} className={styles.step}>
            <div className={styles.stepTop}>
              <div
                className={cn(styles.stepIndicator, {
                  [styles.active]: isActive,
                  [styles.completed]: isCompleted,
                })}
              >
                {index + 1}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(styles.horizontalLine, {
                    [styles.completed]: isCompleted,
                  })}
                />
              )}
            </div>

            <div className={styles.stepTitle}>{step?.['#title']}</div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(CustomStepper)
