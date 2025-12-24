import { TKeyValue } from '../../webform_functions';
type TConditionalSteps = {
    key: string;
    fields_dependent: string[];
};
type TConditionalStepsProperties = {
    have_conditional_step: boolean;
    conditional_steps: TConditionalSteps[];
    conditional_fields: TConditionalSteps[];
    steps_with_conditional_fields: string[];
};
declare const conditionalStepsProperties: (elementsSource: TKeyValue<any>) => TConditionalStepsProperties;
export declare const shouldStepBeVisible: (stepObj: Record<string, any>, watchedValues: Record<string, any>) => boolean;
export declare const getVisibleStepKeys: (stepKeys: string[], elementsSource: Record<string, any>, watchedValuesAllFields: Record<string, any>) => string[];
export declare const getAllVisibleFieldNames: (visibleStepKeys: string[], elementsSource: Record<string, any>, watchedValuesAllFields: Record<string, any>) => string[];
export type { TConditionalSteps, TConditionalStepsProperties };
export { conditionalStepsProperties };
