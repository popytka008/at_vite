// import css from './index.module.scss'

import {useState}         from 'react'
import {trpc}             from '../../lib/trpc.tsx'
import {useFormik}        from 'formik'
// import {withZodSchema}    from 'formik-validator-zod' // !!!
import {zSignUpTrpcInput} from '@at_vite/backend/src/routers/signUp/input.ts'
import {z}                from 'zod'
import {Segment}          from '../../components/Segment'
import {Input}            from '../../components/Input'
import {Button}           from '../../components/Button'
import {Alert}            from '../../components/Alert'
import {FormItems}        from '../../components/FormItems'
import Cookies            from 'js-cookie'
import {useNavigate}      from 'react-router-dom'
import {getAllIdeasRoute} from '../../lib/routes.ts'

export const SignUpPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const navigate = useNavigate()
  const utils = trpc.useUtils()
  const validationSchema = zSignUpTrpcInput
    .extend({
      passwordAgain: z.string().min(1, 'Repeat password!')
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.passwordAgain) {
        ctx.addIssue({
          // code: z.ZodIssueCode.custom,
          code: 'custom',
          message: 'Passwords must be the same',
          path: ['passwordAgain']
        })
      }
    })
  
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: ''
    },
    validate: values => {
      const res = validationSchema.safeParse(values)
      if (res.success) return {}
      const errors: Record<string, string> = {}
      for (const issue of res.error.issues) {
        const key = issue.path.join('.')
        if (!errors[key]) errors[key] = issue.message
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const {token} = await signUp.mutateAsync(values)
        Cookies.set('token', token, {expires: 99999})
        utils.getMe.invalidate()
        navigate(getAllIdeasRoute())
        
      } catch (e: any) {
        setSubmittingError(e.message)
      }
    }
  })
  
  return (
    <Segment title="Sugn Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik}/>
          <Input name="password" label="Password" formik={formik} type="password"/>
          <Input name="passwordAgain" label="Repeat Password" formik={formik} type="password"/>
          {!formik.isValid && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>SignUp</Button>
        </FormItems>
      </form>
    </Segment>
  )
}