import { shouldFieldBeVisible } from '../../webform_fields_functions/webform_fields_conditional_functions';
const getConditionFields = (visible) => {
    const fields = [];
    Object.keys(visible).forEach((key) => {
        const matches = key.match(/:input\[name="([^"]+)"\]/);
        if (matches && matches?.at?.(1)) {
            fields.push(matches[1]);
        }
    });
    return fields;
};
const conditionalStepsProperties = (elementsSource) => {
    const conditional_steps = new Set();
    const conditional_fields = new Set();
    const steps_with_conditional_fields = new Set();
    let have_conditional_step = false;
    Object.entries(elementsSource).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            if (value.hasOwnProperty('#states') && value['#states'].visible) {
                const conditionFields = getConditionFields(value['#states'].visible);
                if (conditionFields.length > 0) {
                    conditional_steps.add({
                        key,
                        fields_dependent: conditionFields,
                    });
                }
            }
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                if (typeof nestedValue === 'object' && nestedValue !== null) {
                    if (nestedValue.hasOwnProperty('#states') &&
                        nestedValue['#states'].visible) {
                        const conditionFields = getConditionFields(nestedValue['#states'].visible);
                        steps_with_conditional_fields.add(key);
                        if (conditionFields.length > 0) {
                            conditional_fields.add({
                                key: nestedKey,
                                fields_dependent: conditionFields,
                            });
                        }
                        have_conditional_step = true;
                    }
                }
            });
        }
    });
    return {
        have_conditional_step,
        conditional_steps: Array.from(conditional_steps),
        conditional_fields: Array.from(conditional_fields),
        steps_with_conditional_fields: Array.from(steps_with_conditional_fields),
    };
};
export const shouldStepBeVisible = (stepObj, watchedValues) => {
    const visibleStates = stepObj?.['#states']?.visible;
    if (!visibleStates)
        return true;
    if (!Array.isArray(visibleStates)) {
        return Object.entries(visibleStates).every(([selector, conditions]) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/);
            if (!match)
                return true;
            const depName = match[1];
            const watched = watchedValues[depName];
            if (watched === undefined)
                return false;
            if (conditions.hasOwnProperty('value')) {
                return watched === conditions.value;
            }
            return true;
        });
    }
    return visibleStates.some((stateCond) => {
        if (typeof stateCond !== 'object' || stateCond === null)
            return false;
        return Object.entries(stateCond).every(([selector, conditions]) => {
            const match = selector.match(/:input\[name="([^"]+)"\]/);
            if (!match)
                return true;
            const depName = match[1];
            const watched = watchedValues[depName];
            if (watched === undefined)
                return false;
            if (conditions.hasOwnProperty('value')) {
                return watched === conditions.value;
            }
            return true;
        });
    });
};
export const getVisibleStepKeys = (stepKeys, elementsSource, watchedValuesAllFields) => {
    return stepKeys.filter((stepKey) => {
        const stepObj = elementsSource[stepKey];
        if (!stepObj['#states'] || !stepObj['#states'].visible)
            return true;
        return shouldFieldBeVisible(stepKey, elementsSource, watchedValuesAllFields);
    });
};
export const getAllVisibleFieldNames = (visibleStepKeys, elementsSource, watchedValuesAllFields) => {
    return visibleStepKeys.flatMap((stepKey) => {
        const stepObj = elementsSource[stepKey];
        return Object.keys(stepObj).filter((fieldKey) => !fieldKey.startsWith('#') &&
            typeof stepObj[fieldKey] === 'object' &&
            Boolean(stepObj[fieldKey]['#type']) &&
            shouldFieldBeVisible(fieldKey, stepObj, watchedValuesAllFields));
    });
};
export { conditionalStepsProperties };
