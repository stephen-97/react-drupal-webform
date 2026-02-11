import styles from './multiStepActions.module.scss'
import stylesField from '../../fields/field.module.scss'
import React from 'react'
import cn from 'classnames'
import { MultiStepActionsProps } from '../../../../lib/types/components/multiStepActions'
import Loader from '../../fields/fields-sub-components/loader/loader'
import { useFormContext } from 'react-hook-form'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

export const MultiStepActions = ({
  previousButtonLabel,
  nextButtonLabel,
  components,
  className,
  classNamePrefix,
  unstyled,
  disableActionButtonWhenInvalid,
  multiStepContext,
}: MultiStepActionsProps) => {
  const { formState, trigger } = useFormContext()
  const { stepIndex, totalVisibleSteps, goNext, goPrev } = multiStepContext

  const { isSubmitting, isValid: isStepValid } = formState

  const isLastStep = stepIndex === totalVisibleSteps - 1

  const isNextDisabled =
    isSubmitting || (disableActionButtonWhenInvalid && !isStepValid)

  const handlePrev = () => {
    goPrev()
  }

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

  const wrapperClassNames = getClassNames({
    name: 'multiStepActions',
    prefix: classNamePrefix,
    unstyled,
    baseCn: cn(styles.multiStepActions, className),
  })

  const buttonBaseClassNames = getClassNames({
    name: 'multiStepActionButton',
    prefix: classNamePrefix,
    unstyled,
    baseCn: cn(stylesField.button, styles.button),
  })

  const prevButtonClassNames = getClassNames({
    name: 'multiStepActionPrev',
    prefix: classNamePrefix,
    unstyled,
    baseCn: buttonBaseClassNames,
  })

  const nextButtonClassNames = getClassNames({
    name: 'multiStepActionNext',
    prefix: classNamePrefix,
    unstyled,
    baseCn: buttonBaseClassNames,
  })

  const dataAttributes = getDataAttributes({
    component: 'multiStepActions',
  })

  return (
    <div className={wrapperClassNames} {...dataAttributes}>
      {stepIndex > 0 && (
        <button
          type="button"
          className={prevButtonClassNames}
          onClick={handlePrev}
        >
          {previousButtonLabel?.length ? previousButtonLabel : 'Prev'}
        </button>
      )}

      <button
        type={isLastStep ? 'submit' : 'button'}
        className={nextButtonClassNames}
        disabled={isNextDisabled}
        onClick={handleNext}
      >
        {isSubmitting && (
          <Loader
            components={components}
            classNamePrefix={classNamePrefix}
            unstyled={unstyled}
          />
        )}
        {isLastStep
          ? 'Submit'
          : nextButtonLabel?.length
            ? nextButtonLabel
            : 'Next'}
      </button>
    </div>
  )
}

export const RenderMultiStepActions = (props: MultiStepActionsProps) => {
  const { components } = props

  const CustomMultiStepActions = components?.multiStepActions

  if (CustomMultiStepActions) {
    return <CustomMultiStepActions {...props} />
  }

  return <MultiStepActions {...props} />
}

export default React.memo(MultiStepActions)
