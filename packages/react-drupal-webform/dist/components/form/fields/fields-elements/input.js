import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
const Input = (props) => {
    const { fieldKey, field, classNames, onBlur, className, innerProps } = props;
    const { control } = useFormContext();
    const { field: fieldController, fieldState } = useController({
        name: fieldKey,
        control,
    });
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
    return (_jsx("input", { id: fieldKey, className: cn(classNames.fields.textInputs.base, classNames.fields.textInputs.types[field?.['#type']], styles.input, styles[field?.['#type']], { [styles.error]: fieldState?.error }, className), name: fieldController.name, minLength: field?.['#minlength'], maxLength: field?.['#maxlength'], placeholder: field?.['#placeholder'], type: getFieldType, onChange: (e) => fieldController.onChange(e), value: fieldController.value ?? '', onBlur: onBlur, required: field?.['#required'], ...innerProps }));
};
export default React.memo(Input);
