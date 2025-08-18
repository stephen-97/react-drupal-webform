import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useController } from 'react-hook-form';
import Wrapper from "./fields-sub-components/wrapper";
import cn from 'classnames';
import styles from './field.module.scss';
export const renderCheckbox = ({ onBlur, control, key, field, classNames, components, }) => {
    var _a;
    const title = field === null || field === void 0 ? void 0 : field['#title'];
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: 'fieldCheckboxes', stateError: fieldState.error, components: components, fieldKey: key, children: _jsxs("div", { className: cn((_a = classNames.fields.checkbox) === null || _a === void 0 ? void 0 : _a.itemWrapper, styles.checkbox), children: [_jsx("input", { className: cn(classNames.fields.checkbox.input), name: fieldController.name, id: key, checked: Boolean(fieldController.value), type: "checkbox", value: title, onChange: (e) => { var _a; return (_a = fieldController.onChange) === null || _a === void 0 ? void 0 : _a.call(fieldController, e.target.checked); }, onBlur: onBlur }), _jsx("label", { htmlFor: key, className: cn(classNames.fields.checkbox.label), children: title })] }) }, key));
};
//# sourceMappingURL=checkbox.js.map