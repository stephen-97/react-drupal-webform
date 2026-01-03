import { jsx as _jsx } from "react/jsx-runtime";
import 'tippy.js/dist/tippy.css';
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg';
const Description = ({ innerProps, components, processed, }) => {
    const CustomWysiwyg = components.wysiwyg ?? Wysiwyg;
    const { className, ...restInnerProps } = innerProps ?? {};
    return (_jsx(CustomWysiwyg, { className: className, processed: processed, as: 'div', source: 'description', ...restInnerProps }));
};
export default Description;
