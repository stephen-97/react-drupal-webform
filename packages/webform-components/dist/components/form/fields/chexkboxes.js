import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController } from 'react-hook-form';
import { getCheckboxChecked, handleChangeOptionsCheckboxes, } from "../../../lib/functions/webform_fields_functions/webform_fields_functions";
import Wrapper from "./fields-sub-components/wrapper";
export const renderCheckboxes = (props) => {
    var _a;
    const { control, key, field, components, classNames, onBlur, valueFormat } = props;
    if (!(field === null || field === void 0 ? void 0 : field['#options'])) {
        return null;
    }
    const options = field['#options'];
    const optionsObj = Object.entries(options);
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    const { checkboxes: checkboxesFormat } = valueFormat;
    const { key: _, ...restProps } = props;
    const CustomCheckboxes = components === null || components === void 0 ? void 0 : components.checkboxes;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: 'fieldCheckboxes', stateError: fieldState.error, components: components, fieldKey: key, wrapperElement: 'fieldset', innerPropsLabelComponent: {
            wrapperElement: 'legend',
        }, children: CustomCheckboxes ? (_jsx(CustomCheckboxes, { fieldController: fieldController, fieldState: fieldState, ...restProps })) : (_jsx("div", { className: cn((_a = classNames.fields.checkboxes) === null || _a === void 0 ? void 0 : _a.groupWrapper, styles.checkboxes), children: optionsObj.map(([optionKey, optionValue], i) => {
                var _a, _b;
                const checked = getCheckboxChecked({
                    checkboxesFormat,
                    optionKey,
                    optionValue,
                    fieldControllerValue: fieldController.value,
                });
                return (_jsxs("div", { className: cn((_a = classNames.fields.checkboxes) === null || _a === void 0 ? void 0 : _a.itemWrapper, styles.checkbox), children: [_jsx("input", { className: cn((_b = classNames.fields.checkboxes) === null || _b === void 0 ? void 0 : _b.itemWrapper, styles.field), name: fieldController.name, type: 'checkbox', id: `checkboxes-${optionKey}-${i}`, value: optionKey, checked: checked, onChange: (e) => handleChangeOptionsCheckboxes(e.target.value, e.target.checked, checkboxesFormat, fieldController, options, optionsObj), onBlur: onBlur }), _jsx("label", { htmlFor: `checkboxes-${optionKey}-${i}`, className: cn(classNames.fields.checkboxes.label), children: optionValue })] }, i));
            }) })) }, key));
};
//# sourceMappingURL=chexkboxes.js.map