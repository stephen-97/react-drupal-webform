import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import React from 'react';
import Loader from './fields-sub-components/loader/loader';
import { useFormContext } from 'react-hook-form';
import { getClassNames } from '../../../lib/functions/utils_functions';
export const Action = ({ field, innerProps, className, classNamePrefix, unstyled, components, fieldKey, disableActionButtonWhenInvalid, }) => {
    const { formState } = useFormContext();
    const { isSubmitting, isValid } = formState;
    const isDisabled = disableActionButtonWhenInvalid && !isValid;
    const actionClassNames = getClassNames({
        name: 'action',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.button, ...(field?.['#attributes']?.class ?? [])),
    });
    const scrollToFirstInvalidField = () => {
        const firstInvalid = document.querySelector('input:invalid, select:invalid, textarea:invalid');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            firstInvalid.focus({ preventScroll: true });
        }
    };
    const handleClick = () => {
        if (!isValid) {
            scrollToFirstInvalidField();
        }
    };
    return (_jsxs("button", { type: "submit", className: actionClassNames, disabled: isDisabled, onClick: handleClick, ...innerProps, children: [isSubmitting && (_jsx(Loader, { components: components, field: field, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled })), field?.['#submit__label'] ?? 'Submit'] }));
};
export const renderAction = (props) => {
    const { fieldKey, components } = props;
    const CustomAction = components?.fieldById?.[fieldKey] ?? components?.action;
    if (CustomAction) {
        return _jsx(CustomAction, { ...props });
    }
    return (_jsx(React.Fragment, { children: _jsx(Action, { ...props }) }, fieldKey));
};
