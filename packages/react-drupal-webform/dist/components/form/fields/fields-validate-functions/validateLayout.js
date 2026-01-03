import { formatMessage } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
import { getRequiredMessage, getErrorMessage, } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions';
import FormMappingFields from '../../formMappingFields/formMappingFields';
import { extractVisibleFields, shouldFieldBeVisible, } from '../../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions';
export const validateLayout = (props) => {
    const { yupObject, defaultValues, field, defaultFieldValues, defaultFieldStateMessages, customValidators, watchedValues = {}, minLengthMessage, maxLengthMessage, } = props;
    const childFields = Object.fromEntries(Object.entries(field).filter(([k]) => !k.startsWith('#')));
    const childVisibleKeys = Object.keys(childFields).filter((childKey) => shouldFieldBeVisible(childKey, childFields, watchedValues));
    const realVisibleFields = extractVisibleFields(childFields, childVisibleKeys, watchedValues);
    realVisibleFields.forEach(({ key: childKey, field: childField }) => {
        const type = childField['#type'];
        const required = childField?.['#required'];
        const requiredMessage = formatMessage(getRequiredMessage(defaultFieldStateMessages, type) ?? '', childField?.['#title']);
        const errorMessage = formatMessage(getErrorMessage(defaultFieldStateMessages, type) ?? '', childField?.['#title']);
        FormMappingFields[type ?? 'default']?.validator?.({
            yupObject,
            defaultValues,
            key: childKey,
            field: childField,
            required: Boolean(required),
            defaultFieldValues,
            defaultFieldStateMessages,
            requiredMessage,
            customValidators,
            errorMessage,
            watchedValues,
            minLengthMessage,
            maxLengthMessage,
        });
    });
};
