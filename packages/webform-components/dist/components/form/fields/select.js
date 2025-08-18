import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './field.module.scss';
import { useController } from 'react-hook-form';
import { handleChangeOptions } from "../../../lib/functions/webform_fields_functions/webform_fields_functions";
import cn from 'classnames';
import Wrapper from "./fields-sub-components/wrapper";
export const renderSelect = (props) => {
    var _a, _b;
    const { control, key, field, components, classNames, valueFormat } = props;
    const { key: _, ...restProps } = props;
    const { field: fieldController, fieldState } = useController({
        name: key,
        control,
    });
    if (!(field === null || field === void 0 ? void 0 : field['#options'])) {
        return null;
    }
    const options = field['#options'];
    const optionsObj = Object.entries(options);
    const { select: selectFormat } = valueFormat;
    const CustomSelect = components === null || components === void 0 ? void 0 : components.select;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: 'fieldSelect', components: components, stateError: fieldState.error, fieldKey: key, children: CustomSelect ? (_jsx(CustomSelect, { fieldController: fieldController, fieldState: fieldState, ...restProps })) : (_jsxs("select", { className: cn((_a = classNames.fields.select) === null || _a === void 0 ? void 0 : _a.select, styles.field, styles[field === null || field === void 0 ? void 0 : field['#type']], {
                [styles.error]: fieldState.error,
            }), required: field === null || field === void 0 ? void 0 : field['#required'], id: key, name: fieldController.name, onChange: (e) => handleChangeOptions(e.target.value, selectFormat, fieldController, options), children: [_jsx("option", { className: classNames.fields.select.option, value: "", children: (_b = field === null || field === void 0 ? void 0 : field['#placeholder']) !== null && _b !== void 0 ? _b : '-- Select an option --' }), optionsObj.map(([optionKey, optionValue], i) => (_jsx("option", { className: classNames.fields.select.option, value: optionKey, children: optionValue }, i)))] })) }, key));
};
//# sourceMappingURL=select.js.map