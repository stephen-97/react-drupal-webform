export const useYupValidationResolver =
  (validationSchema: any) => async (data: any) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      })

      return {
        values,
        errors: {},
      }
    } catch (errors) {
      return {
        values: {},
        errors: (errors as any).inner.reduce(
          (allErrors: any, currentError: any) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            },
          }),
          {}
        ),
      }
    }
  }
