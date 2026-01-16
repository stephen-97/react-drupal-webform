import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
const Textarea = ({ fieldKey, field, classNames, onBlur, className, innerProps, }) => {
    const { control } = useFormContext();
    const { field: fieldController, fieldState } = useController({
        name: fieldKey,
        control,
    });
    return (_jsx("textarea", { id: fieldKey, name: fieldController.name, minLength: field?.['#minlength'], maxLength: field?.['#maxlength'], rows: field?.['#rows'] ?? 10, placeholder: field?.['#placeholder'], required: field?.['#required'], value: fieldController.value ?? '', onChange: (e) => fieldController.onChange(e.target.value), onBlur: onBlur, className: cn(classNames.fields.textInputs.types.textarea, classNames.fields.textInputs.base, styles.field, styles.textarea, className, { [styles.error]: fieldState?.error }), ...innerProps }));
};
export default React.memo(Textarea);
