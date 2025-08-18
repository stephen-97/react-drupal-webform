import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import styles from "../wrapper.module.scss";
import ErrorFieldMessage from "../errorFieldMessage/errorFieldMessage";
const WrapperField = ({ components, classNames, field, children, stateError, }) => {
    var _a, _b, _c;
    const CustomErrorFieldMessage = (_a = components === null || components === void 0 ? void 0 : components.errorFieldMessage) !== null && _a !== void 0 ? _a : ErrorFieldMessage;
    return (_jsx(_Fragment, { children: (field === null || field === void 0 ? void 0 : field['#field_prefix']) || (field === null || field === void 0 ? void 0 : field['#field_suffix']) ? (_jsxs("div", { className: styles.prefixSuffixContainer, children: [(field === null || field === void 0 ? void 0 : field['#field_prefix']) && _jsx("span", { children: field['#field_prefix'] }), _jsxs("div", { className: styles.fieldContainer, children: [children, typeof (stateError === null || stateError === void 0 ? void 0 : stateError.message) === 'string' &&
                            stateError.message.length > 0 && (_jsx(CustomErrorFieldMessage, { className: (_b = classNames.states) === null || _b === void 0 ? void 0 : _b.fieldErrorMessage, message: stateError.message }))] }), (field === null || field === void 0 ? void 0 : field['#field_suffix']) && _jsx("span", { children: field['#field_suffix'] })] })) : (_jsxs(_Fragment, { children: [children, typeof (stateError === null || stateError === void 0 ? void 0 : stateError.message) === 'string' &&
                    stateError.message.length > 0 && (_jsx(CustomErrorFieldMessage, { className: (_c = classNames.states) === null || _c === void 0 ? void 0 : _c.fieldErrorMessage, message: stateError.message }))] })) }));
};
export default React.memo(WrapperField);
//# sourceMappingURL=wrapperField.js.map