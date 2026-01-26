import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Checkbox from './fields-elements/checkbox';
import Title from './fields-sub-components/title/title';
import styles from '../fields/field.module.scss';
export const renderCheckbox = (props) => {
    const { fieldKey, field, components, classNamePrefix, unstyled } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomCheckbox = components?.fieldById?.[fieldKey] ?? components?.checkbox;
    const CustomLabel = components?.title ?? Title;
    const title = field?.['#title'];
    return (_jsx(FieldContainerComponent, { field: field, isLabel: false, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled, children: CustomCheckbox ? (_jsx(CustomCheckbox, { ...props })) : (_jsxs(_Fragment, { children: [_jsx(Checkbox, { ...props }), title && (_jsx(CustomLabel, { classNamePrefix: classNamePrefix, wrapperElement: "label", fieldKey: fieldKey, components: components, field: field, className: styles.checkboxLabel, unstyled: unstyled }))] })) }, fieldKey));
};
