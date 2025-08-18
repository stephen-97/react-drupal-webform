import React from 'react';
import FormMappingFields from "../formMappingFields/formMappingFields";
const FormFieldRendered = ({ control, index, fieldKey, field, formState, valueFormat, components, classNames, isMultiStep, }) => {
    var _a, _b;
    const type = (_a = field['#type']) !== null && _a !== void 0 ? _a : 'default';
    const elementRenderer = (_b = FormMappingFields[type]) === null || _b === void 0 ? void 0 : _b.element;
    if (!elementRenderer)
        return null;
    return elementRenderer({
        control,
        index,
        key: fieldKey,
        field,
        valueFormat,
        isMultiStep,
        components,
        classNames,
        formState,
    });
};
export default React.memo(FormFieldRendered);
//# sourceMappingURL=formFieldRendered.js.map