import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Checkbox from './fields-elements/checkbox';
import Title from './fields-sub-components/title/title';
import styles from '../fields/field.module.scss';
export const renderCheckbox = (props) => {
    const { fieldKey, field, classNames, components } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomCheckbox = components?.fieldById?.[fieldKey] ?? components?.checkbox;
    const CustomLabel = components?.title ?? Title;
    const title = field?.['#title'];
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, isLabel: false, components: components, fieldKey: fieldKey, children: CustomCheckbox ? (_jsx(CustomCheckbox, { ...props })) : (_jsxs(_Fragment, { children: [_jsx(Checkbox, { ...props }), title && (_jsx(CustomLabel, { wrapperElement: "label", fieldKey: fieldKey, components: components, classNames: classNames, field: field, className: styles.checkboxLabel }))] })) }, fieldKey));
};
