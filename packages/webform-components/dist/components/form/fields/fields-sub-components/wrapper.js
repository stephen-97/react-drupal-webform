import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './wrapper.module.scss';
import { getWrapperCategory } from "../../../../lib/functions/webform_fields_functions/webform_fields_functions";
import WrapperLabel from "./wrapper-sub-components/wrapperLabel";
import WrapperField from "./wrapper-sub-components/wrapperField";
import WrapperDescription from "./wrapper-sub-components/wrapperDescription";
import WrapperMore from "./wrapper-sub-components/wrapperMore";
import WrapperManagedFileInfo from "./wrapper-sub-components/wrapperManagedFileInfo";
const Wrapper = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { children, field, classNames, isLabel = true, stateError, components, fieldKey, innerPropsLabelComponent, wrapperElement = 'div', } = props;
    const CustomWrapper = components === null || components === void 0 ? void 0 : components.wrapper;
    if (CustomWrapper) {
        return _jsx(CustomWrapper, { ...props, children: children });
    }
    const wrapperCategory = getWrapperCategory(field['#type']);
    const WrapperElement = wrapperElement;
    return (_jsxs(WrapperElement, { className: cn(...((_b = (_a = field === null || field === void 0 ? void 0 : field['#attributes']) === null || _a === void 0 ? void 0 : _a.class) !== null && _b !== void 0 ? _b : []), (_d = (_c = classNames.wrappers) === null || _c === void 0 ? void 0 : _c.byFieldType) === null || _d === void 0 ? void 0 : _d[field['#type']], wrapperCategory
            ? (_f = (_e = classNames.wrappers) === null || _e === void 0 ? void 0 : _e.byCategory) === null || _f === void 0 ? void 0 : _f[wrapperCategory]
            : undefined, (_g = classNames.wrappers) === null || _g === void 0 ? void 0 : _g.base, {
            [(_h = classNames.states.fieldError) !== null && _h !== void 0 ? _h : '']: Boolean(stateError),
        }, styles.fieldWrapper), children: [isLabel && (field === null || field === void 0 ? void 0 : field['#title']) && (_jsx(WrapperLabel, { components: components, field: field, classNames: classNames, fieldKey: fieldKey, innerPropsLabelComponent: innerPropsLabelComponent })), _jsx(WrapperField, { field: field, classNames: classNames, components: components, stateError: stateError, children: children }), ((field === null || field === void 0 ? void 0 : field['#description']) || (field === null || field === void 0 ? void 0 : field['#file_placeholder'])) && (_jsx(WrapperDescription, { field: field, classNames: classNames, components: components })), field['#type'] === 'managed_file' && (_jsx(WrapperManagedFileInfo, { field: field, components: components })), (field === null || field === void 0 ? void 0 : field['#more']) && (field === null || field === void 0 ? void 0 : field['#more_title']) && (_jsx(WrapperMore, { fieldMore: field['#more'], fieldMoreTitle: field['#more_title'], classNames: classNames, components: components }))] }));
};
export default React.memo(Wrapper);
//# sourceMappingURL=wrapper.js.map