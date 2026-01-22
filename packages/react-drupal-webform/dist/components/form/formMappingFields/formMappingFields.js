import { renderAction } from '../fields/action';
import { renderRadio } from '../fields/radios';
import { renderCheckboxes } from '../fields/checkboxes';
import { renderSelect } from '../fields/select';
import { renderMarkup } from '../fields/markup';
import { renderCheckbox } from '../fields/checkbox';
import { renderTextArea } from '../fields/textarea';
import { validateEmail } from '../fields/fields-validate-functions/validateEmail';
import { validateTel } from '../fields/fields-validate-functions/validateTel';
import { validateNumber } from '../fields/fields-validate-functions/validateNumber';
import { validateTextField } from '../fields/fields-validate-functions/validateTextfield';
import { validateDate } from '../fields/fields-validate-functions/validateDate';
import { validateRadio } from '../fields/fields-validate-functions/validateRadios';
import { validateCheckbox } from '../fields/fields-validate-functions/validateCheckbox';
import { validateCheckboxes } from '../fields/fields-validate-functions/validateCheckboxes';
import { validateSelect } from '../fields/fields-validate-functions/validateSelect';
import { validateManagedFile } from '../fields/fields-validate-functions/validateManagedFile';
import { validateTextArea } from '../fields/fields-validate-functions/validateTextArea';
import renderInput from '../fields/input';
import renderManagedFile from '../fields/managedFile';
import { renderHidden } from '../fields/hidden';
import { validateHidden } from '../fields/fields-validate-functions/validateHidden';
import renderLayout from '../fields/layout';
import { validateLayout } from '../fields/fields-validate-functions/validateLayout';
import renderUnsupportedField from '../fields/unsupportedField';
import { validateUnsupportedField } from '../fields/fields-validate-functions/validateUnsupportedField';
const FormMappingFields = {
    textfield: {
        element: renderInput,
        validator: validateTextField,
    },
    textarea: {
        element: renderTextArea,
        validator: validateTextArea,
    },
    radios: {
        element: renderRadio,
        validator: validateRadio,
    },
    webform_actions: {
        element: renderAction,
        validator: null,
    },
    checkbox: {
        element: renderCheckbox,
        validator: validateCheckbox,
    },
    checkboxes: {
        element: renderCheckboxes,
        validator: validateCheckboxes,
    },
    number: {
        element: renderInput,
        validator: validateNumber,
    },
    tel: {
        element: renderInput,
        validator: validateTel,
    },
    select: {
        element: renderSelect,
        validator: validateSelect,
    },
    email: {
        element: renderInput,
        validator: validateEmail,
    },
    date: {
        element: renderInput,
        validator: validateDate,
    },
    webform_markup: {
        element: renderMarkup,
        validator: null,
    },
    managed_file: {
        element: renderManagedFile,
        validator: validateManagedFile,
    },
    hidden: {
        element: renderHidden,
        validator: validateHidden,
    },
    fieldset: {
        element: renderLayout,
        validator: validateLayout,
    },
    container: {
        element: renderLayout,
        validator: validateLayout,
    },
    details: {
        element: renderLayout,
        validator: validateLayout,
    },
    webform_flexbox: {
        element: renderLayout,
        validator: validateLayout,
    },
    webform_section: {
        element: renderLayout,
        validator: validateLayout,
    },
    default: {
        element: renderUnsupportedField,
        validator: validateUnsupportedField,
    },
};
export default FormMappingFields;
