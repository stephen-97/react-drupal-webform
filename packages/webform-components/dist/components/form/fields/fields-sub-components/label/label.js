import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Help from "../help/help";
import cn from 'classnames';
import styles from './label.module.scss';
const Label = ({ title, innerProps, isRequired, innerPropsHelpComponent, custom_component_help, wrapperElement, }) => {
    var _a, _b, _c, _d, _e, _f;
    const CustomHelp = custom_component_help !== null && custom_component_help !== void 0 ? custom_component_help : Help;
    const Element = wrapperElement !== null && wrapperElement !== void 0 ? wrapperElement : 'label';
    const filteredInnerProps = Object.fromEntries(Object.entries(innerProps !== null && innerProps !== void 0 ? innerProps : {}).filter(([_, value]) => value !== '' && value !== undefined));
    const { className, ...restInnerProps } = filteredInnerProps !== null && filteredInnerProps !== void 0 ? filteredInnerProps : {};
    return (_jsxs(Element, { className: cn(styles.label, className, {
            [styles.isRequired]: isRequired,
        }), ...restInnerProps, children: [title, (((_c = (_b = (_a = innerPropsHelpComponent.helps) === null || _a === void 0 ? void 0 : _a.help) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0 ||
                ((_f = (_e = (_d = innerPropsHelpComponent.helps) === null || _d === void 0 ? void 0 : _d.processed_help_title) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) >
                    0) && _jsx(CustomHelp, { ...innerPropsHelpComponent })] }));
};
export default Label;
//# sourceMappingURL=label.js.map