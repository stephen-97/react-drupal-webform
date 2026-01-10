import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import React from 'react';
import Loader from './fields-sub-components/loader/loader';
import { useFormContext } from 'react-hook-form';
export const renderAction = ({ field, fieldKey, submitButtonRef, }) => {
    const { formState } = useFormContext();
    const { isSubmitting, isValid } = formState;
    return (_jsx(React.Fragment, { children: _jsxs("button", { className: cn(styles.button, ...(field?.['#attributes']?.class ?? [])), type: "submit", ref: submitButtonRef, disabled: !isValid || isSubmitting, children: [isSubmitting && _jsx(Loader, {}), field?.['#submit__label'] ?? 'Submit'] }) }, fieldKey));
};
