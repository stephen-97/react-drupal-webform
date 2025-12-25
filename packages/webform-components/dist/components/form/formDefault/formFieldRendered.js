import React from 'react';
import FormMappingFields from '../formMappingFields/formMappingFields';
const FormFieldRendered = ({ index, fieldKey, field, components, classNames, isMultiStep, watchedValues, }) => {
    const type = field['#type'] ?? 'default';
    const elementRenderer = FormMappingFields[type]?.element;
    if (!elementRenderer)
        return null;
    const isLayout = [
        'webform_section',
        'webform_flexbox',
        'container',
        'details',
        'fieldset',
    ].includes(type);
    return elementRenderer({
        index,
        fieldKey,
        field,
        isMultiStep,
        components,
        classNames,
        ...(isLayout ? { watchedValues } : {}),
    });
};
export default React.memo(FormFieldRendered);
