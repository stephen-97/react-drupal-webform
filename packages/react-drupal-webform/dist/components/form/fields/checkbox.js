import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import cn from 'classnames';
import styles from './field.module.scss';
export const renderCheckbox = (props) => {
    const { onBlur, fieldKey, field, classNames, components } = props;
    const title = field?.['#title'];
    const isRequired = Boolean(field?.['#required']);
    const { control } = useFormContext();
    const CustomCheckbox = components?.fieldById?.[fieldKey] ?? components?.checkbox;
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldCheckboxes", stateError: fieldState?.error, isLabel: false, components: components, fieldKey: fieldKey, children: CustomCheckbox ? (_jsx(CustomCheckbox, { ...props })) : (_jsxs("div", { className: cn(classNames.fields.checkbox?.itemWrapper, styles.checkbox), children: [_jsx("input", { id: fieldKey, className: cn(classNames.fields.checkbox.input), name: fieldController.name, type: "checkbox", value: title, checked: Boolean(fieldController.value), onChange: (e) => fieldController.onChange(e.target.checked), onBlur: onBlur }), title && (_jsx("label", { htmlFor: fieldKey, className: cn(classNames.fields.checkbox.label, styles.checkboxLabel, {
                        [styles.isRequired]: isRequired,
                    }), children: title }))] })) }, fieldKey));
};
