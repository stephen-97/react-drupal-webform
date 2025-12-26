import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { handleChangeOptions } from '../../../lib/functions/webform_fields_functions/webform_fields_functions';
import cn from 'classnames';
import Wrapper from './fields-sub-components/wrapper';
export const renderSelect = (props) => {
    const { fieldKey, field, components, classNames, onBlur } = props;
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select;
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldSelect", components: components, stateError: fieldState?.error, fieldKey: fieldKey, children: CustomSelect ? (_jsx(CustomSelect, { ...props })) : (_jsxs("select", { id: fieldKey, name: fieldController.name, required: field?.['#required'], className: cn(classNames.fields.select?.select, styles.field, styles[field?.['#type']], { [styles.error]: fieldState?.error }), value: fieldController.value ?? '', onChange: (e) => handleChangeOptions(e.target.value, fieldController), children: [_jsx("option", { className: classNames.fields.select.option, value: "", children: field?.['#placeholder'] ?? '-- Select an option --' }), optionsObj.map(([optionKey, optionValue]) => (_jsx("option", { className: classNames.fields.select.option, value: optionKey, children: optionValue }, optionKey)))] })) }, fieldKey));
};
