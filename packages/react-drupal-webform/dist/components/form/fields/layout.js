import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import FormFieldRendered from '../formDefault/formFieldRendered';
import LayoutWrapper from './fields-sub-components/layoutWrapper/layoutWrapper';
import { shouldFieldBeVisible } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions';
const renderLayout = (props) => {
    const { fieldKey, field, classNames, components, watchedValues } = props;
    const childKeys = Object.keys(field).filter((k) => !k.startsWith('#'));
    const { fieldKey: _omitKey, ...restProps } = props;
    return (_createElement(LayoutWrapper, { ...restProps, fieldKey: fieldKey, key: fieldKey }, childKeys.map((childKey, i) => {
        const child = field[childKey];
        const isVisible = shouldFieldBeVisible(childKey, field, watchedValues ?? {});
        if (!isVisible)
            return null;
        return (_jsx(FormFieldRendered, { fieldKey: childKey, index: i, field: child, components: components, classNames: classNames, isMultiStep: false, watchedValues: watchedValues }, childKey));
    })));
};
export default renderLayout;
