export const useYupValidationResolver = (validationSchema) => async (data) => {
    try {
        const values = await validationSchema.validate(data, {
            abortEarly: false,
        });
        return {
            values,
            errors: {},
        };
    }
    catch (errors) {
        return {
            values: {},
            errors: errors.inner.reduce((allErrors, currentError) => {
                var _a;
                return ({
                    ...allErrors,
                    [currentError.path]: {
                        type: (_a = currentError.type) !== null && _a !== void 0 ? _a : 'validation',
                        message: currentError.message,
                    },
                });
            }, {}),
        };
    }
};
//# sourceMappingURL=webform_yup_functions.js.map