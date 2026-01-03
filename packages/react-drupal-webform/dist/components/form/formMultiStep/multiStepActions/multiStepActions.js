import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './multiStepActions.module.scss';
import stylesField from '../../fields/field.module.scss';
import React from 'react';
import cn from 'classnames';
import Loader from '../../fields/fields-sub-components/loader/loader';
import { useFormContext } from 'react-hook-form';
import { useMultiStepContext } from '../multiStepContext';
const MultiStepActions = (props) => {
    const { previousButtonLabel, nextButtonLabel, components, classNames } = props;
    const { formState, trigger } = useFormContext();
    const { stepIndex, totalVisibleSteps, goNext, goPrev } = useMultiStepContext();
    const { isSubmitting, isValid: isStepValid } = formState;
    const CustomMultiStepActions = components?.multiStepActions;
    if (CustomMultiStepActions) {
        return _jsx(CustomMultiStepActions, { ...props });
    }
    const isLastStep = stepIndex === totalVisibleSteps - 1;
    const handlePrev = () => {
        goPrev();
    };
    const handleNext = async (e) => {
        if (!isLastStep) {
            e.preventDefault();
            e.stopPropagation();
            const valid = await trigger();
            if (valid) {
                goNext();
            }
        }
    };
    return (_jsxs("div", { className: cn(styles.multiStepActions, classNames.multiStep.actionsContainer), children: [stepIndex > 0 && (_jsx("button", { className: cn(stylesField.button, styles.button, classNames.multiStep.actionsButtons, classNames.multiStep.actionsButtonPrev), type: "button", onClick: handlePrev, children: previousButtonLabel && previousButtonLabel.length > 0
                    ? previousButtonLabel
                    : 'Prev' })), _jsxs("button", { className: cn(stylesField.button, styles.button, classNames.multiStep.actionsButtons, classNames.multiStep.actionsButtonsNext), disabled: !isStepValid || isSubmitting, type: isLastStep ? 'submit' : 'button', onClick: handleNext, children: [isSubmitting && _jsx(Loader, {}), isLastStep
                        ? 'Submit'
                        : nextButtonLabel && nextButtonLabel.length > 0
                            ? nextButtonLabel
                            : 'Next'] })] }));
};
export default React.memo(MultiStepActions);
