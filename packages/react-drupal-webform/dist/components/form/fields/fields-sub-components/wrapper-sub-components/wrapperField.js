import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import styles from "../wrapper.module.scss";
import ErrorFieldMessage from "../errorFieldMessage/errorFieldMessage";
const WrapperField = ({ components, classNames, field, children, stateError, }) => {
    const CustomErrorFieldMessage = components?.errorFieldMessage ?? ErrorFieldMessage;
    return (_jsx(_Fragment, { children: field?.['#field_prefix'] || field?.['#field_suffix'] ? (_jsxs("div", { className: styles.prefixSuffixContainer, children: [field?.['#field_prefix'] && _jsx("span", { children: field['#field_prefix'] }), _jsxs("div", { className: styles.fieldContainer, children: [children, typeof stateError?.message === 'string' &&
                            stateError.message.length > 0 && (_jsx(CustomErrorFieldMessage, { className: classNames.states?.fieldErrorMessage, message: stateError.message }))] }), field?.['#field_suffix'] && _jsx("span", { children: field['#field_suffix'] })] })) : (_jsxs(_Fragment, { children: [children, typeof stateError?.message === 'string' &&
                    stateError.message.length > 0 && (_jsx(CustomErrorFieldMessage, { className: classNames.states?.fieldErrorMessage, message: stateError.message }))] })) }));
};
export default React.memo(WrapperField);
