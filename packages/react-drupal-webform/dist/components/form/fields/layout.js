import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import FormFieldRendered from '../formDefault/formFieldRendered';
import Layout from './fields-sub-components/layout/layout';
import { shouldFieldBeVisible } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions';
const renderLayout = (props) => {
    const { fieldKey, field, components, watchedValues, classNamePrefix, unstyled, validationMode, disableActionButtonWhenInvalid = false, } = props;
    const LayoutComponent = components?.layout ?? Layout;
    const childKeys = Object.keys(field).filter((key) => !key.startsWith('#'));
    const values = watchedValues ?? {};
    return (_createElement(LayoutComponent, { ...props, fieldKey: fieldKey, key: fieldKey }, childKeys.map((childKey, index) => {
        const child = field[childKey];
        if (!shouldFieldBeVisible(childKey, field, values))
            return null;
        return (_jsx(FormFieldRendered, { fieldKey: childKey, index: index, field: child, classNamePrefix: classNamePrefix, components: components, isMultiStep: false, watchedValues: watchedValues, unstyled: unstyled, validationMode: validationMode, disableActionButtonWhenInvalid: disableActionButtonWhenInvalid }, childKey));
    })));
};
export default renderLayout;
