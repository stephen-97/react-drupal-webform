import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import React from 'react';
import Loader from './fields-sub-components/loader/loader';
import { useFormContext } from 'react-hook-form';
export const Action = ({ field, innerProps, className, classNamePrefix, }) => {
    const { formState } = useFormContext();
    const { isSubmitting, isValid } = formState;
    return (_jsxs("button", { type: "submit", disabled: !isValid || isSubmitting, className: cn(styles.button, className, ...(field?.['#attributes']?.class ?? [])), ...innerProps, children: [isSubmitting && _jsx(Loader, { classNamePrefix: classNamePrefix }), field?.['#submit__label'] ?? 'Submit'] }));
};
export const renderAction = (props) => {
    const { fieldKey, components } = props;
    const CustomAction = components?.fieldById?.[fieldKey] ?? components?.action;
    if (CustomAction) {
        return _jsx(CustomAction, { ...props });
    }
    return (_jsx(React.Fragment, { children: _jsx(Action, { ...props }) }, fieldKey));
};
