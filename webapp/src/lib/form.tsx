import {z}                                                from 'zod'
import {type FormikHelpers, type FormikValues, useFormik} from 'formik'
import {useState, useMemo}                                from 'react'
import type {AlertProps}                                  from '../components/Alert'
import type {ButtonProps}                                 from '../components/Button'

const withZodValidator = (schema: z.ZodTypeAny) => (values: z.infer<typeof schema>): Record<string, string> => {
  const rez = schema.safeParse(values)
  if (rez.success) return {}
  
  const errors: Record<string, string> = {}
  for (const issue of rez.error.issues) {
    const key = issue.path.join('.')
    if (!errors[key]) errors[key] = issue.message
  }
  return errors
}

export const useForm = <TZodSchema extends z.ZodType<FormikValues>>({
                                                                      successMessage = false,
                                                                      resetOnSuccess = true,
                                                                      showValidationAlert = false,
                                                                      initialValues,
                                                                      validationSchema,
                                                                      validate,
                                                                      onSubmit
                                                                    }: {
  successMessage?: string | false
  resetOnSuccess?: boolean
  showValidationAlert?: boolean
  initialValues: z.infer<TZodSchema>
  // validate: {} | any
  validationSchema?: TZodSchema
  validate?: (values: z.infer<TZodSchema>) => Partial<Record<string, string>>
  onSubmit: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any
}) => {
  const [submittingError, setSubmittingError] = useState<Error | null>(null)
  const [succesMessageVisible, setSuccessMessageVisible] = useState(false)
  
  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues: initialValues || ({} as any),
    validate: validate ?? (validationSchema ? withZodValidator(validationSchema) : undefined),
    // ...(validationSchema && {validate: withZodSchema(validationSchema)}),
    onSubmit: async (values, formikHelpers) => {
      console.log('SUBMIT FIRED', values)
      try {
        setSubmittingError(null)
        await onSubmit(values, formikHelpers)
        if (resetOnSuccess) {
          formik.resetForm()
        }
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (err: any) {
        setSubmittingError(err)
      }
    }
  })
  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red'
      }
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Some fields are invalid',
        color: 'red'
      }
    }
    if (succesMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green'
      }
    }
    return {
      hidden: true,
      children: null,
      color: 'red'
    }
  }, [submittingError, formik.isValid, formik.submitCount, succesMessageVisible, successMessage, showValidationAlert])
  
  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting
    }
  }, [formik.isSubmitting])
  
  return {
    formik,
    alertProps,
    buttonProps
  }
}