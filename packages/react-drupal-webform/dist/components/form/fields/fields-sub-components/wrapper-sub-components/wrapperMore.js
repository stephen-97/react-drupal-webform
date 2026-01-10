import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from '../wrapper.module.scss';
import More from '../more/more';
const WrapperMore = ({ components, classNames, fieldMore, fieldMoreTitle, }) => {
    const CustomMore = components?.more ?? More;
    return (_jsx(CustomMore, { innerPropsContainer: {
            className: classNames.general.fieldMore,
        }, innerPropsWysiwyg: {
            className: cn(styles.wysiwyg, classNames.general.fieldWysiwyg),
            processed: fieldMore,
            source: 'more',
        }, moreTitle: fieldMoreTitle, components: components }));
};
export default React.memo(WrapperMore);
