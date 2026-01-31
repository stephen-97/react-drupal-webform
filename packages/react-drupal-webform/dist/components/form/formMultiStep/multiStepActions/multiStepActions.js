import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './multiStepActions.module.scss';
import stylesField from '../../fields/field.module.scss';
import React from 'react';
import cn from 'classnames';
import Loader from '../../fields/fields-sub-components/loader/loader';
import { useFormContext } from 'react-hook-form';
import { useMultiStepContext } from '../multiStepContext';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
export const MultiStepActions = ({ previousButtonLabel, nextButtonLabel, components, className, classNamePrefix, unstyled, disableActionButtonWhenInvalid, }) => {
    const { formState, trigger } = useFormContext();
    const { stepIndex, totalVisibleSteps, goNext, goPrev } = useMultiStepContext();
    const { isSubmitting, isValid: isStepValid } = formState;
    const isLastStep = stepIndex === totalVisibleSteps - 1;
    const isNextDisabled = isSubmitting || (disableActionButtonWhenInvalid && !isStepValid);
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
    const wrapperClassNames = getClassNames({
        name: 'multiStepActions',
        prefix: classNamePrefix,
        unstyled,
        baseCn: cn(styles.multiStepActions, className),
    });
    const buttonBaseClassNames = getClassNames({
        name: 'multiStepActionButton',
        prefix: classNamePrefix,
        unstyled,
        baseCn: cn(stylesField.button, styles.button),
    });
    const prevButtonClassNames = getClassNames({
        name: 'multiStepActionPrev',
        prefix: classNamePrefix,
        unstyled,
        baseCn: buttonBaseClassNames,
    });
    const nextButtonClassNames = getClassNames({
        name: 'multiStepActionNext',
        prefix: classNamePrefix,
        unstyled,
        baseCn: buttonBaseClassNames,
    });
    const dataAttributes = getDataAttributes({
        component: 'multiStepActions',
    });
    return (_jsxs("div", { className: wrapperClassNames, ...dataAttributes, children: [stepIndex > 0 && (_jsx("button", { type: "button", className: prevButtonClassNames, onClick: handlePrev, children: previousButtonLabel?.length ? previousButtonLabel : 'Prev' })), _jsxs("button", { type: isLastStep ? 'submit' : 'button', className: nextButtonClassNames, disabled: isNextDisabled, onClick: handleNext, children: [isSubmitting && (_jsx(Loader, { components: components, classNamePrefix: classNamePrefix, unstyled: unstyled })), isLastStep
                        ? 'Submit'
                        : nextButtonLabel?.length
                            ? nextButtonLabel
                            : 'Next'] })] }));
};
export const RenderMultiStepActions = (props) => {
    const { components } = props;
    const CustomMultiStepActions = components?.multiStepActions;
    if (CustomMultiStepActions) {
        return _jsx(CustomMultiStepActions, { ...props });
    }
    return _jsx(MultiStepActions, { ...props });
};
export default React.memo(MultiStepActions);
