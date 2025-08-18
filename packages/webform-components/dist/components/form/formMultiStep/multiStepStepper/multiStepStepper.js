import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './multiStepStepper.module.scss';
import React from 'react';
import cn from 'classnames';
const MultiStepActions = (props) => {
    var _a;
    const { step, multiStepTitleAs = 'span', currentStepObj, totalSteps, components, classNames, } = props;
    const CustomMultiStepStepper = components === null || components === void 0 ? void 0 : components.multiStepStepper;
    if (CustomMultiStepStepper) {
        return _jsx(CustomMultiStepStepper, { ...props });
    }
    const TagTitle = multiStepTitleAs;
    const title = currentStepObj === null || currentStepObj === void 0 ? void 0 : currentStepObj['#title'];
    const minPercent = 3;
    const maxPercent = 100;
    let percent = minPercent;
    if (totalSteps > 1) {
        percent =
            step === 0
                ? minPercent
                : step === totalSteps - 1
                    ? maxPercent
                    : minPercent + ((maxPercent - minPercent) / (totalSteps - 1)) * step;
    }
    return (_jsxs("div", { className: cn(styles.multiStepStepper, classNames.multiStep.stepperContainer), children: [_jsxs("div", { className: cn(styles.headerStepperContainer, (_a = classNames.multiStep) === null || _a === void 0 ? void 0 : _a.stepperHeader), children: [title && title.length > 0 && (_jsx(TagTitle, { className: cn(styles.title, classNames.multiStep.stepperTitle), children: title })), _jsxs("span", { className: cn(styles.multiStepStepperCounter, classNames.multiStep.stepperCounter), children: [step + 1, "/", totalSteps] })] }), _jsx("div", { className: cn(styles.progressBarContainer, classNames.multiStep.stepperProgressBarContainer), children: _jsx("div", { className: cn(styles.progressBar, classNames.multiStep.stepperProgressBar), style: { width: `${percent}%` } }) })] }));
};
export default React.memo(MultiStepActions);
//# sourceMappingURL=multiStepStepper.js.map