import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './field.module.scss';
import { useController } from 'react-hook-form';
import { getRadioChecked, handleChangeOptions, } from "../../../lib/functions/webform_fields_functions/webform_fields_functions";
import Wrapper from "./fields-sub-components/wrapper";
export const renderRadio = ({ onBlur, control, key, field, valueFormat, classNames, components, }) => {
    var _a;
    if (!(field === null || field === void 0 ? void 0 : field['#options'])) {
        return null;
    }
    const options = field['#options'];
    const optionsObj = Object.entries(options);
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    const { radios: radioFormat } = valueFormat;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: 'fieldRadio', components: components, stateError: fieldState.error, fieldKey: key, wrapperElement: 'fieldset', innerPropsLabelComponent: {
            wrapperElement: 'legend',
        }, children: _jsx("div", { className: cn((_a = classNames.fields.radios) === null || _a === void 0 ? void 0 : _a.groupWrapper, styles.radiosGroupWrapper), children: optionsObj.map(([optionKey, optionValue], i) => {
                var _a, _b;
                const checked = getRadioChecked({
                    radioFormat,
                    optionKey,
                    optionValue,
                    fieldControllerValue: fieldController.value,
                });
                return (_jsxs("div", { className: cn((_a = classNames.fields.radios) === null || _a === void 0 ? void 0 : _a.itemWrapper, styles.radiosItemWrapper), children: [_jsx("input", { className: cn((_b = classNames.fields.radios) === null || _b === void 0 ? void 0 : _b.input), name: fieldController.name, id: `${optionKey}-${i}`, type: 'radio', checked: checked, value: optionKey, onChange: (e) => handleChangeOptions(e.target.value, radioFormat, fieldController, options), onBlur: onBlur }), _jsx("label", { htmlFor: `${optionKey}-${i}`, className: cn(classNames.fields.radios.label, styles.radioLabel), children: optionValue })] }, i));
            }) }) }, key));
};
//# sourceMappingURL=radios.js.map