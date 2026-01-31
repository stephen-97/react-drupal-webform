import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'classnames';
import styles from './form.module.scss';
import { getClassNames } from '../../lib/functions/utils_functions';
const Form = (props) => {
    const { children, onSubmit, className, innerProps, classNamePrefix, unstyled, validationMode, disableActionButtonWhenInvalid, } = props;
    const isHtmlNative = validationMode === 'htmlNative';
    const formClassName = getClassNames({
        name: 'form',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.form),
    });
    return (_jsx("form", { className: formClassName, onSubmit: onSubmit, noValidate: !isHtmlNative, ...innerProps, children: children }));
};
export default Form;
