import { fileToBase64 } from "./webform_fields_file_functions";
const handleChangeOptions = (selectedKey, format, fieldController, options) => {
    let transformedValue;
    const optionsObj = Object.entries(options);
    switch (format) {
        case 'key':
            transformedValue = selectedKey;
            break;
        case 'value':
            transformedValue = options[selectedKey];
            break;
        case 'keyValue':
            transformedValue = { [selectedKey]: options[selectedKey] };
            break;
        case 'booleanMap':
            transformedValue = optionsObj.reduce((acc, [key]) => {
                acc[key] = key === selectedKey;
                return acc;
            }, {});
            break;
        default:
            transformedValue = selectedKey;
    }
    fieldController.onChange(transformedValue);
};
const handleChangeOptionsCheckboxes = (selectedKey, checked, format, fieldController, options, optionsObj) => {
    var _a;
    let transformedValue;
    let selectedKeys = [];
    if (format === 'key') {
        selectedKeys = Array.isArray(fieldController.value)
            ? fieldController.value
            : [];
    }
    else if (format === 'value') {
        selectedKeys =
            (_a = Object.entries(options)
                .filter(([_, value]) => { var _a; return (_a = fieldController.value) === null || _a === void 0 ? void 0 : _a.includes(value); })
                .map(([key]) => key)) !== null && _a !== void 0 ? _a : [];
    }
    else if (format === 'booleanMap') {
        selectedKeys =
            typeof fieldController.value === 'object' &&
                !Array.isArray(fieldController.value)
                ? Object.keys(fieldController.value).filter((key) => fieldController.value[key])
                : [];
    }
    else if (format === 'keyValue') {
        selectedKeys = Array.isArray(fieldController.value)
            ? fieldController.value.map((obj) => Object.keys(obj)[0])
            : [];
    }
    if (checked && !(selectedKeys === null || selectedKeys === void 0 ? void 0 : selectedKeys.includes(selectedKey))) {
        selectedKeys.push(selectedKey);
    }
    else {
        selectedKeys = selectedKeys.filter((key) => key !== selectedKey);
    }
    switch (format) {
        case 'key':
            transformedValue = selectedKeys;
            break;
        case 'value':
            transformedValue = Object.values(options).filter((value, index) => selectedKeys.includes(Object.keys(options)[index]));
            break;
        case 'keyValue':
            transformedValue = selectedKeys.map((key) => ({ [key]: options[key] }));
            break;
        case 'booleanMap':
            const booleanMap = optionsObj.reduce((acc, [key]) => {
                var _a, _b;
                acc[key] = (_b = (_a = fieldController.value) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : false;
                return acc;
            }, {});
            booleanMap[selectedKey] = checked;
            transformedValue = booleanMap;
            break;
        default:
            transformedValue = selectedKeys;
    }
    fieldController.onChange(transformedValue);
};
const handleFileChange = async (event, fieldController, inputRef) => {
    try {
        const { files } = event.target;
        if (files && files.length > 0 && (inputRef === null || inputRef === void 0 ? void 0 : inputRef.current)) {
            const file = files[0];
            const base64 = await fileToBase64(file);
            fieldController.onChange({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModified,
                base64,
            });
            inputRef.current.value = '';
        }
    }
    catch (err) {
        console.error('Error', err);
    }
};
const getWrapperCategory = (type) => {
    if (['textfield', 'textarea', 'email', 'number', 'tel'].includes(type))
        return 'textInput';
    if (['select', 'radios'].includes(type))
        return 'selectionInput';
    if (['checkbox', 'checkboxes'].includes(type))
        return 'booleanInput';
    return undefined;
};
export const getRadioChecked = ({ radioFormat, optionKey, optionValue, fieldControllerValue, }) => {
    if (radioFormat === 'booleanMap') {
        return Boolean(fieldControllerValue === null || fieldControllerValue === void 0 ? void 0 : fieldControllerValue[optionKey]);
    }
    if (radioFormat === 'key') {
        return fieldControllerValue === optionKey;
    }
    if (radioFormat === 'value') {
        return fieldControllerValue === optionValue;
    }
    if (radioFormat === 'keyValue') {
        return (fieldControllerValue === null || fieldControllerValue === void 0 ? void 0 : fieldControllerValue.key) === optionKey;
    }
    return false;
};
export const getCheckboxChecked = ({ checkboxesFormat, optionKey, optionValue, fieldControllerValue, }) => {
    if (checkboxesFormat === 'booleanMap') {
        return Boolean(fieldControllerValue === null || fieldControllerValue === void 0 ? void 0 : fieldControllerValue[optionKey]);
    }
    if (checkboxesFormat === 'key') {
        return (Array.isArray(fieldControllerValue) &&
            fieldControllerValue.includes(optionKey));
    }
    if (checkboxesFormat === 'value') {
        return (Array.isArray(fieldControllerValue) &&
            fieldControllerValue.includes(optionValue));
    }
    if (checkboxesFormat === 'keyValue') {
        return (Array.isArray(fieldControllerValue) &&
            fieldControllerValue.some((entry) => Object.keys(entry)[0] === optionKey));
    }
    return false;
};
export { handleChangeOptions, handleFileChange, handleChangeOptionsCheckboxes, getWrapperCategory, };
//# sourceMappingURL=webform_fields_functions.js.map