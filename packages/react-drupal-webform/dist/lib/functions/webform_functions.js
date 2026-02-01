import { isMultiStep } from './webform_multistep_functions/webform_multistep_functions';
const getWebformProperties = (elements) => {
    const formIsMultiStep = isMultiStep(elements);
    return {
        elementsSources: elements,
        isMultiStep: formIsMultiStep,
    };
};
export { getWebformProperties };
