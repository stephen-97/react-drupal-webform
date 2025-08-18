import { jsx as _jsx } from "react/jsx-runtime";
import 'tippy.js/dist/tippy.css';
import Wysiwyg from "../../fields-special-components/wysiwyg/wysiwyg";
const Description = ({ innerProps, custom_component_wysiwyg, processed, }) => {
    const CustomWysiwyg = custom_component_wysiwyg !== null && custom_component_wysiwyg !== void 0 ? custom_component_wysiwyg : Wysiwyg;
    const { className, ...restInnerProps } = innerProps !== null && innerProps !== void 0 ? innerProps : {};
    return (_jsx(CustomWysiwyg, { className: className, processed: processed, as: 'div', ...restInnerProps }));
};
export default Description;
//# sourceMappingURL=description.js.map