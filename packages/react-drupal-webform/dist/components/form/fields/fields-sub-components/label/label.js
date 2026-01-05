import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Help from '../help/help';
import cn from 'classnames';
import styles from './label.module.scss';
const Label = ({ field, innerProps, innerPropsHelpComponent, custom_component_help, wrapperElement, }) => {
    const CustomHelp = custom_component_help ?? Help;
    const Element = wrapperElement ?? 'label';
    const filteredInnerProps = Object.fromEntries(Object.entries(innerProps ?? {}).filter(([_, value]) => value !== '' && value !== undefined));
    const { className, ...restInnerProps } = filteredInnerProps ?? {};
    const isRequired = field?.['#required'];
    const title = field?.['#title'];
    return (_jsxs(Element, { className: cn(styles.label, className, {
            [styles.isRequired]: isRequired,
        }), ...restInnerProps, children: [title, ((innerPropsHelpComponent.helps?.help?.length ?? 0) > 0 ||
                (innerPropsHelpComponent.helps?.processed_help_title?.length ?? 0) >
                    0) && _jsx(CustomHelp, { ...innerPropsHelpComponent })] }));
};
export default Label;
