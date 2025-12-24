import { generateFormSchemaAndDefaults } from '../webform_fields_functions/webform_fields_conditional_functions';
const isMultiStep = (elementsSource) => {
    return Object.values(elementsSource).some((value) => value?.['#type'] === 'webform_wizard_page');
};
export const getAllFieldNames = (elementsSource) => {
    const allFields = [];
    Object.values(elementsSource).forEach((stepObj) => {
        Object.keys(stepObj).forEach((fieldKey) => {
            if (!fieldKey.startsWith('#') &&
                typeof stepObj[fieldKey] === 'object' &&
                Boolean(stepObj[fieldKey]['#type'])) {
                allFields.push(fieldKey);
            }
        });
    });
    return allFields;
};
export const getDummyDefaultMultiStep = (elementsSource) => {
    const allDefaults = {};
    Object.values(elementsSource).forEach((stepObj) => {
        Object.keys(stepObj).forEach((key) => {
            if (!key.startsWith('#') &&
                typeof stepObj[key] === 'object' &&
                Boolean(stepObj[key]['#type'])) {
                allDefaults[key] = '';
            }
        });
    });
    return allDefaults;
};
export const getAllDefaultValuesFromAllSteps = ({ elementsSource, defaultFieldValues, defaultFieldStateMessages, }) => {
    let allDefaultValues = {};
    Object.entries(elementsSource).forEach(([_, stepObj]) => {
        const fieldKeys = Object.keys(stepObj).filter((key) => !key.startsWith('#') &&
            typeof stepObj[key] === 'object' &&
            Boolean(stepObj[key]['#type']));
        const { defaultValues } = generateFormSchemaAndDefaults({
            elementsSource: stepObj,
            visibleElementsKeys: fieldKeys,
            defaultFieldValues,
            defaultFieldStateMessages,
        });
        allDefaultValues = { ...allDefaultValues, ...defaultValues };
    });
    return allDefaultValues;
};
export { isMultiStep };
