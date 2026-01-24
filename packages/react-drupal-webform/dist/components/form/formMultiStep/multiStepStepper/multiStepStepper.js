import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './multiStepStepper.module.scss';
import React from 'react';
import cn from 'classnames';
import { useMultiStepContext } from '../multiStepContext';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const MultiStepStepper = (props) => {
    const { multiStepTitleAs = 'span', currentStepObj, components, className, classNamePrefix, } = props;
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
    const wrapperClassNames = getClassNames({
        name: 'multiStepStepper',
        prefix: classNamePrefix,
        baseCn: cn(styles.multiStepStepper, className),
    });
    const headerClassNames = getClassNames({
        name: 'multiStepStepperHeader',
        prefix: classNamePrefix,
        baseCn: styles.headerStepperContainer,
    });
    const titleClassNames = getClassNames({
        name: 'multiStepStepperTitle',
        prefix: classNamePrefix,
        baseCn: styles.title,
    });
    const counterClassNames = getClassNames({
        name: 'multiStepStepperCounter',
        prefix: classNamePrefix,
        baseCn: styles.multiStepStepperCounter,
    });
    const progressContainerClassNames = getClassNames({
        name: 'multiStepStepperProgressContainer',
        prefix: classNamePrefix,
        baseCn: styles.progressBarContainer,
    });
    const progressBarClassNames = getClassNames({
        name: 'multiStepStepperProgress',
        prefix: classNamePrefix,
        baseCn: styles.progressBar,
    });
    const dataAttributes = getDataAttributes({
        component: 'multiStepStepper',
    });
    return (_jsxs("div", { className: wrapperClassNames, ...dataAttributes, children: [_jsxs("div", { className: headerClassNames, children: [title && _jsx(TagTitle, { className: titleClassNames, children: title }), _jsxs("span", { className: counterClassNames, children: [stepIndex + 1, "/", totalVisibleSteps] })] }), _jsx("div", { className: progressContainerClassNames, children: _jsx("div", { className: progressBarClassNames, style: { width: `${percent}%` } }) })] }));
};
export default React.memo(MultiStepStepper);
