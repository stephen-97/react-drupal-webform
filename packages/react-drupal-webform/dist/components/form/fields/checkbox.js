import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import cn from 'classnames';
import styles from './field.module.scss';
import Label from './fields-sub-components/label/label';
export const renderCheckbox = (props) => {
    const { onBlur, fieldKey, field, classNames, components } = props;
    const title = field?.['#title'];
    const { control } = useFormContext();
    const CustomCheckbox = components?.fieldById?.[fieldKey] ?? components?.checkbox;
    const controller = useController({ name: fieldKey, control });
    const { field: fieldController, fieldState } = controller;
    const CustomLabel = components?.label ?? Label;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldCheckboxes", stateError: fieldState?.error, isLabel: false, components: components, fieldKey: fieldKey, children: CustomCheckbox ? (_jsx(CustomCheckbox, { ...props })) : (_jsxs("div", { className: cn(classNames.fields.checkbox?.itemWrapper, styles.checkbox), children: [_jsx("input", { id: fieldKey, className: cn(classNames.fields.checkbox.input), name: fieldController.name, type: "checkbox", value: title, checked: Boolean(fieldController.value), onChange: (e) => fieldController.onChange(e.target.checked), onBlur: onBlur }), title && (_jsx(CustomLabel, { wrapperElement: 'label', fieldKey: fieldKey, components: components, classNames: classNames, field: field }))] })) }, fieldKey));
};
