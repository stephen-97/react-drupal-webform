import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import styles from '../fieldContainer.module.scss';
import ErrorFieldMessage from '../errorFieldMessage/errorFieldMessage';
const WrapperField = ({ components, classNames, field, children, fieldKey, classNamePrefix, unstyled, }) => {
    const ErrorFieldMessageComponent = components?.errorFieldMessage ?? ErrorFieldMessage;
    return (_jsx(_Fragment, { children: field?.['#field_prefix'] || field?.['#field_suffix'] ? (_jsxs("div", { className: styles.prefixSuffixContainer, children: [field?.['#field_prefix'] && _jsx("span", { children: field['#field_prefix'] }), _jsxs("div", { className: styles.fieldContainer, children: [children, _jsx(ErrorFieldMessageComponent, { classNamePrefix: classNamePrefix, classNames: classNames, field: field, fieldKey: fieldKey, components: components, unstyled: unstyled })] }), field?.['#field_suffix'] && _jsx("span", { children: field['#field_suffix'] })] })) : (_jsxs(_Fragment, { children: [children, _jsx(ErrorFieldMessageComponent, { classNamePrefix: classNamePrefix, classNames: classNames, field: field, fieldKey: fieldKey, components: components, unstyled: unstyled })] })) }));
};
export default React.memo(WrapperField);
