import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { handleChangeOptionsCheckboxes } from '../../../lib/functions/webform_fields_functions/webform_fields_functions';
import Wrapper from './fields-sub-components/wrapper';
export const renderCheckboxes = (props) => {
    const { fieldKey, field, components, classNames, onBlur } = props;
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const CustomCheckboxes = components?.fieldById?.[fieldKey] ?? components?.checkboxes;
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldCheckboxes", stateError: fieldState?.error, components: components, fieldKey: fieldKey, wrapperElement: "fieldset", innerPropsLabelComponent: { wrapperElement: 'legend' }, children: CustomCheckboxes ? (_jsx(CustomCheckboxes, { ...props })) : (_jsx("div", { className: cn(classNames.fields.checkboxes?.groupWrapper, styles.checkboxes), children: optionsObj.map(([optionKey, optionValue], i) => {
                const checked = Array.isArray(fieldController.value)
                    ? fieldController.value.includes(optionKey)
                    : false;
                const correctOptionKey = optionKey.trim();
                return (_jsxs("div", { className: cn(classNames.fields.checkboxes?.itemWrapper, styles.checkbox), children: [_jsx("input", { id: `checkboxes-${correctOptionKey}-${i}`, className: cn(classNames.fields.checkboxes?.input, styles.field), name: fieldController.name, type: "checkbox", value: optionKey, checked: checked, onChange: (e) => handleChangeOptionsCheckboxes(e.target.value, e.target.checked, fieldController), onBlur: onBlur }), _jsx("label", { htmlFor: `checkboxes-${correctOptionKey}-${i}`, className: cn(classNames.fields.checkboxes?.label, styles.labelCheckbox), children: optionValue })] }, optionKey));
            }) })) }, fieldKey));
};
