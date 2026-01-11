import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { handleChangeOptions } from '../../../lib/functions/webform_fields_functions/webform_fields_functions';
import Wrapper from './fields-sub-components/wrapper';
export const renderRadio = (props) => {
    const { onBlur, fieldKey, field, classNames, components } = props;
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const CustomRadio = components?.fieldById?.[fieldKey] ?? components?.radios;
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldRadio", components: components, stateError: fieldState?.error, fieldKey: fieldKey, wrapperElement: "fieldset", children: CustomRadio ? (_jsx(CustomRadio, { ...props })) : (_jsx("div", { className: cn(classNames.fields.radios?.groupWrapper, styles.radiosGroupWrapper), children: optionsObj.map(([optionKey, optionValue]) => {
                const checked = fieldController.value === optionKey;
                const inputId = `${fieldKey}-${optionKey.trim()}`;
                return (_jsxs("div", { className: cn(classNames.fields.radios?.itemWrapper, styles.radiosItemWrapper), children: [_jsx("input", { className: classNames.fields.radios?.input, name: fieldController.name, id: inputId, type: "radio", checked: checked, value: optionKey, onChange: (e) => handleChangeOptions(e.target.value, fieldController), onBlur: onBlur }), _jsx("label", { htmlFor: inputId, className: cn(classNames.fields.radios?.label, styles.radioLabel), children: optionValue })] }, optionKey));
            }) })) }, fieldKey));
};
