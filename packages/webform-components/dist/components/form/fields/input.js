import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController } from 'react-hook-form';
import Wrapper from "./fields-sub-components/wrapper";
const renderInput = (props) => {
    var _a;
    const { control, key, field, components, classNames, onBlur } = props;
    const { key: _, ...restProps } = props;
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    const CustomInput = components === null || components === void 0 ? void 0 : components.input;
    const getFieldType = (() => {
        switch (field === null || field === void 0 ? void 0 : field['#type']) {
            case 'textfield':
                return 'text';
            case 'date':
                return 'date';
            case 'number':
                return 'number';
            case 'email':
                return 'email';
            case 'tel':
                return 'tel';
            default:
                return 'text';
        }
    })();
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: 'fieldInput', stateError: fieldState.error, components: components, fieldKey: key, children: CustomInput ? (_jsx(CustomInput, { fieldController: fieldController, fieldState: fieldState, ...restProps })) : (_jsx("input", { id: key, className: cn(classNames.fields.textInputs.base, classNames.fields.textInputs.types[field === null || field === void 0 ? void 0 : field['#type']], styles.input, styles[field === null || field === void 0 ? void 0 : field['#type']], {
                [styles.error]: fieldState.error,
            }), name: fieldController.name, minLength: field === null || field === void 0 ? void 0 : field['#minlength'], maxLength: field === null || field === void 0 ? void 0 : field['#maxlength'], placeholder: field === null || field === void 0 ? void 0 : field['#placeholder'], type: getFieldType, onChange: (e) => { var _a; return (_a = fieldController.onChange) === null || _a === void 0 ? void 0 : _a.call(fieldController, e); }, value: (_a = fieldController === null || fieldController === void 0 ? void 0 : fieldController.value) !== null && _a !== void 0 ? _a : '', onBlur: onBlur, required: field === null || field === void 0 ? void 0 : field['#required'] })) }, key));
};
export default renderInput;
//# sourceMappingURL=input.js.map