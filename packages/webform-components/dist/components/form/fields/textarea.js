import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController } from 'react-hook-form';
import Wrapper from "./fields-sub-components/wrapper";
export const renderTextArea = ({ onBlur, control, key, field, classNames, components, }) => {
    var _a, _b;
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: 'fieldTextarea', components: components, stateError: fieldState.error, fieldKey: key, children: _jsx("textarea", { id: key, className: cn(classNames.fields.textInputs.types.textarea, classNames.fields.textInputs.base, styles.field, styles.textarea, {
                [styles.error]: fieldState.error,
            }), name: fieldController.name, minLength: field === null || field === void 0 ? void 0 : field['#minlength'], maxLength: field === null || field === void 0 ? void 0 : field['#maxlength'], rows: (_a = field === null || field === void 0 ? void 0 : field['#rows']) !== null && _a !== void 0 ? _a : 10, placeholder: field === null || field === void 0 ? void 0 : field['#placeholder'], onChange: (e) => { var _a; return (_a = fieldController.onChange) === null || _a === void 0 ? void 0 : _a.call(fieldController, e); }, value: (_b = fieldController.value) !== null && _b !== void 0 ? _b : '', onBlur: onBlur }) }, key));
};
//# sourceMappingURL=textarea.js.map