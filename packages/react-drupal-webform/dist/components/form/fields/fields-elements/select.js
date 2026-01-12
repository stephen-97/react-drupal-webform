import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { handleChangeOptions } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
const Select = ({ fieldKey, field, classNames, innerProps, className, }) => {
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const { field: fieldController, fieldState } = useController({
        name: fieldKey,
        control,
    });
    const optionsObj = Object.entries(field['#options']);
    return (_jsxs("select", { id: fieldKey, name: fieldController.name, required: field?.['#required'], className: cn(classNames.fields.select?.select, styles.field, styles[field?.['#type']], className, { [styles.error]: fieldState?.error }), value: fieldController.value ?? '', onChange: (e) => handleChangeOptions(e.target.value, fieldController), ...innerProps, children: [_jsx("option", { className: classNames.fields.select.option, value: "", children: field?.['#placeholder'] ?? '-- Select an option --' }), optionsObj.map(([optionKey, optionValue]) => (_jsx("option", { className: classNames.fields.select.option, value: optionKey, children: optionValue }, optionKey)))] }));
};
export default React.memo(Select);
