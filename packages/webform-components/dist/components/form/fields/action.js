import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import React from 'react';
import Loader from "./fields-sub-components/loader/loader";
export const renderAction = ({ field, key, submitButtonRef, formState, }) => {
    var _a, _b, _c;
    const { isSubmitting, isValid } = formState || {};
    return (_jsx(React.Fragment, { children: _jsxs("button", { className: cn(styles.button, ...((_b = (_a = field === null || field === void 0 ? void 0 : field['#attributes']) === null || _a === void 0 ? void 0 : _a.class) !== null && _b !== void 0 ? _b : [])), type: "submit", ref: submitButtonRef, disabled: !isValid || isSubmitting, children: [isSubmitting && _jsx(Loader, {}), (_c = field === null || field === void 0 ? void 0 : field['#submit__label']) !== null && _c !== void 0 ? _c : 'Submit'] }) }, key));
};
//# sourceMappingURL=action.js.map