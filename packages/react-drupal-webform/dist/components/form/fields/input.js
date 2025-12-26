import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
const renderInput = (props) => {
    const { fieldKey, field, components, classNames, onBlur } = props;
    const { control } = useFormContext();
    const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input;
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    const getFieldType = (() => {
        switch (field?.['#type']) {
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
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldInput", stateError: fieldState?.error, components: components, fieldKey: fieldKey, children: CustomInput ? (_jsx(CustomInput, { ...props })) : (_jsx("input", { id: fieldKey, className: cn(classNames.fields.textInputs.base, classNames.fields.textInputs.types[field?.['#type']], styles.input, styles[field?.['#type']], { [styles.error]: fieldState?.error }), name: fieldController.name, minLength: field?.['#minlength'], maxLength: field?.['#maxlength'], placeholder: field?.['#placeholder'], type: getFieldType, onChange: (e) => fieldController.onChange(e), value: fieldController.value ?? '', onBlur: onBlur, required: field?.['#required'] })) }, fieldKey));
};
export default renderInput;
