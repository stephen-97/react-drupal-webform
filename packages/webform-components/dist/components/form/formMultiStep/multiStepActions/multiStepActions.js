'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './multiStepActions.module.scss';
import stylesField from '../../fields/field.module.scss';
import React from 'react';
import cn from 'classnames';
import Loader from "../../fields/fields-sub-components/loader/loader";
const MultiStepActions = (props) => {
    const { step, totalSteps, previousButtonLabel, nextButtonLabel, components, classNames, buttonsOnClick, formState, } = props;
    const { isSubmitting, isValid: isStepValid } = formState;
    const CustomMultiStepActions = components === null || components === void 0 ? void 0 : components.multiStepActions;
    if (CustomMultiStepActions) {
        return _jsx(CustomMultiStepActions, { ...props });
    }
    const isLastStep = step === totalSteps - 1;
    return (_jsxs("div", { className: cn(styles.multiStepActions, classNames.multiStep.actionsContainer), children: [step > 0 && (_jsx("button", { className: cn(stylesField.button, styles.button, classNames.multiStep.actionsButtons, classNames.multiStep.actionsButtonPrev), type: "button", onClick: buttonsOnClick.prev, children: previousButtonLabel && previousButtonLabel.length > 0
                    ? previousButtonLabel
                    : 'prev' })), _jsxs("button", { className: cn(stylesField.button, styles.button, classNames.multiStep.actionsButtons, classNames.multiStep.actionsButtonsNext), disabled: !isStepValid || isSubmitting, type: isLastStep ? 'submit' : 'button', onClick: (e) => {
                    if (!isLastStep) {
                        e.preventDefault();
                        e.stopPropagation();
                        buttonsOnClick.next();
                    }
                }, children: [isSubmitting && _jsx(Loader, {}), isLastStep
                        ? 'Submit'
                        : nextButtonLabel && nextButtonLabel.length > 0
                            ? nextButtonLabel
                            : 'Next'] })] }));
};
export default React.memo(MultiStepActions);
//# sourceMappingURL=multiStepActions.js.map