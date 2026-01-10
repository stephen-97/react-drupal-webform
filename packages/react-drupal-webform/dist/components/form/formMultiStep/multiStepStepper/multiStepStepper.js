import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './multiStepStepper.module.scss';
import React from 'react';
import cn from 'classnames';
import { useMultiStepContext } from '../multiStepContext';
const MultiStepStepper = (props) => {
    const { multiStepTitleAs = 'span', currentStepObj, components, classNames, } = props;
    const { stepIndex, totalVisibleSteps } = useMultiStepContext();
    const CustomMultiStepStepper = components?.multiStepStepper;
    if (CustomMultiStepStepper) {
        return _jsx(CustomMultiStepStepper, { ...props });
    }
    const TagTitle = multiStepTitleAs;
    const title = currentStepObj?.['#title'];
    const minPercent = 3;
    const maxPercent = 100;
    let percent = minPercent;
    if (totalVisibleSteps > 1) {
        percent =
            stepIndex === 0
                ? minPercent
                : stepIndex === totalVisibleSteps - 1
                    ? maxPercent
                    : minPercent +
                        ((maxPercent - minPercent) / (totalVisibleSteps - 1)) * stepIndex;
    }
    return (_jsxs("div", { className: cn(styles.multiStepStepper, classNames.multiStep.stepperContainer), children: [_jsxs("div", { className: cn(styles.headerStepperContainer, classNames.multiStep?.stepperHeader), children: [title && title.length > 0 && (_jsx(TagTitle, { className: cn(styles.title, classNames.multiStep.stepperTitle), children: title })), _jsxs("span", { className: cn(styles.multiStepStepperCounter, classNames.multiStep.stepperCounter), children: [stepIndex + 1, "/", totalVisibleSteps] })] }), _jsx("div", { className: cn(styles.progressBarContainer, classNames.multiStep.stepperProgressBarContainer), children: _jsx("div", { className: cn(styles.progressBar, classNames.multiStep.stepperProgressBar), style: { width: `${percent}%` } }) })] }));
};
export default React.memo(MultiStepStepper);
