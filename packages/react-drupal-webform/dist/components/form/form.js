import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import cn from 'classnames';
import styles from './form.module.scss';
import { getClassNames } from '../../lib/functions/utils_functions';
import { useFormContext } from 'react-hook-form';
const Form = (props) => {
    const { children, onSubmit, className, innerProps, classNamePrefix, unstyled, validationMode, } = props;
    const isHtmlNative = validationMode === 'htmlNative';
    const { formState } = useFormContext();
    const { errors, submitCount } = formState;
    const formClassName = getClassNames({
        name: 'form',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.form),
    });
    const openDetailsParents = (element) => {
        let parent = element.parentElement;
        while (parent) {
            if (parent instanceof HTMLDetailsElement) {
                parent.open = true;
            }
            parent = parent.parentElement;
        }
    };
    const handleInvalidCapture = (e) => {
        if (!isHtmlNative)
            return;
        const target = e.target;
        if (!target)
            return;
        openDetailsParents(target);
    };
    useEffect(() => {
        if (!submitCount)
            return;
        if (!errors || Object.keys(errors).length === 0)
            return;
        const firstInvalid = document.querySelector('[aria-invalid="true"], input:invalid, textarea:invalid, select:invalid');
        if (!firstInvalid)
            return;
        openDetailsParents(firstInvalid);
        firstInvalid.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
        firstInvalid.focus({ preventScroll: true });
    }, [errors, submitCount]);
    return (_jsx("form", { className: formClassName, onSubmit: onSubmit, noValidate: !isHtmlNative, onInvalidCapture: handleInvalidCapture, ...props, ...innerProps, children: children }));
};
export default Form;
