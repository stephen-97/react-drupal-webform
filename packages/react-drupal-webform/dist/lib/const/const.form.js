import { jsx as _jsx } from "react/jsx-runtime";
import Wysiwyg from '../../components/form/fields/fields-special-components/wysiwyg/wysiwyg';
import Input from '../../components/form/fields/fields-elements/input';
import Title from '../../components/form/fields/fields-sub-components/title/title';
import Checkbox from '../../components/form/fields/fields-elements/checkbox';
import Checkboxes from '../../components/form/fields/fields-elements/checkboxes';
import Hidden from '../../components/form/fields/fields-elements/hidden';
import ManagedFile from '../../components/form/fields/fields-elements/managedFile';
import Radios from '../../components/form/fields/fields-elements/radios';
import Select from '../../components/form/fields/fields-elements/select';
import Textarea from '../../components/form/fields/fields-elements/textarea';
import FieldContainer from '../../components/form/fields/fields-sub-components/fieldContainer';
import { Action } from '../../components/form/fields/action';
import Help from '../../components/form/fields/fields-sub-components/help/help';
import More from '../../components/form/fields/fields-sub-components/more/more';
import Description from '../../components/form/fields/fields-sub-components/description/description';
import Form from '../../components/form/form';
import Markup from '../../components/form/fields/markup';
import Layout from '../../components/form/fields/fields-sub-components/layout/layout';
export const defaultValuesObj = {
    textfield: '',
    textarea: '',
    email: '',
    radios: '',
    checkboxes: [],
    checkbox: false,
    number: '',
    tel: '',
    date: '',
    managed_file: {},
    select: '',
    hidden: '',
};
export const defaultValuesFieldStateMessages = {
    general: {
        errorMessage: '',
        requiredMessage: 'Field "{fieldName}" is required.',
        minLengthMessage: 'Field "{fieldName}" must contain at least {minLength} characters.',
        maxLengthMessage: 'Field "{fieldName}" must contain no more than {maxLength} characters.',
    },
    fields: {
        errorMessages: {
            textfield: '',
            textarea: '',
            email: 'Please enter a valid email address (e.g., name@example.com).',
            number: 'Please enter a number.',
            tel: 'Please enter a valid phone number.',
            date: 'Invalid date format.',
            managed_file: '',
            radios: '',
            hidden: '',
            checkbox: '',
            checkboxes: '',
            select: '',
        },
        requiredMessages: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            managed_file: '',
            select: '',
            hidden: '',
        },
        minLengthMessage: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            hidden: '',
        },
        maxLengthMessage: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            hidden: '',
        },
    },
};
/**
 * export type TDrupalNonValueFieldType =
 *   | 'webform_markup'
 *   | 'webform_actions'
 *   | 'container'
 *   | 'webform_flexbox'
 *   | 'webform_section'
 *   | 'details'
 *   | 'fieldset'
 */
export const defaultValuesClassnames = {
    wrappers: {
        base: '',
        byCategory: {
            textInput: '',
            selectionInput: '',
            booleanInput: '',
        },
        byFieldType: {
            checkbox: '',
            checkboxes: '',
            date: '',
            email: '',
            webform_markup: '',
            textarea: '',
            textfield: '',
            radios: '',
            number: '',
            tel: '',
            select: '',
            managed_file: '',
            webform_actions: '',
            container: '',
            fieldset: '',
            hidden: '',
            details: '',
            webform_section: '',
            webform_flexbox: '',
        },
    },
    general: {
        fieldForm: '',
        fieldTitle: '',
        fieldDescription: '',
        fieldManagedFileInfo: '',
        fieldMore: {
            container: '',
            button: '',
        },
        fieldHelp: '',
        fieldWysiwyg: '',
    },
    states: {
        fieldError: '',
        fieldErrorMessage: '',
    },
    fields: {
        textInputs: {
            base: '',
            types: {
                text: '',
                email: '',
                number: '',
                tel: '',
                textarea: '',
                textfield: '',
            },
        },
        checkboxes: {
            groupWrapper: '',
            itemWrapper: '',
            input: '',
            label: '',
        },
        checkbox: {
            itemWrapper: '',
            input: '',
            label: '',
        },
        radios: {
            groupWrapper: '',
            itemWrapper: '',
            input: '',
            label: '',
        },
        select: {
            select: '',
            option: '',
        },
        managedFile: {
            input: '',
        },
        markup: {
            base: '',
        },
        layout: {
            wrapper: '',
            title: '',
            inner: '',
        },
    },
    multiStep: {
        stepperContainer: '',
        stepperHeader: '',
        stepperTitle: '',
        stepperCounter: '',
        stepperProgressBarContainer: '',
        stepperProgressBar: '',
        actionsContainer: '',
        actionsButtons: '',
        actionsButtonPrev: '',
        actionsButtonsNext: '',
    },
};
export const components = {
    Input: (props) => _jsx(Input, { ...props }),
    Wysiwyg: (props) => _jsx(Wysiwyg, { ...props }),
    Title: (props) => _jsx(Title, { ...props }),
    Checkbox: (props) => _jsx(Checkbox, { ...props }),
    Checkboxes: (props) => (_jsx(Checkboxes, { ...props })),
    Hidden: (props) => _jsx(Hidden, { ...props }),
    ManagedFile: (props) => (_jsx(ManagedFile, { ...props })),
    Radios: (props) => _jsx(Radios, { ...props }),
    Select: (props) => _jsx(Select, { ...props }),
    TextArea: (props) => _jsx(Textarea, { ...props }),
    Wrapper: (props) => _jsx(FieldContainer, { ...props }),
    Action: (props) => _jsx(Action, { ...props }),
    Help: (props) => _jsx(Help, { ...props }),
    More: (props) => _jsx(More, { ...props }),
    Form: (props) => _jsx(Form, { ...props }),
    Markup: (props) => _jsx(Markup, { ...props }),
    Layout: (props) => _jsx(Layout, { ...props }),
    Description: (props) => (_jsx(Description, { ...props })),
};
