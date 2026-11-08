import {useFormik}        from 'formik'
import {useState}         from 'react'
import {trpc}             from '../../lib/trpc.tsx'
import {zSignInTrpcInput} from '@at_vite/backend/src/routers/signIn/input.ts'
import {Segment}          from '../../components/Segment'
import {FormItems}        from '../../components/FormItems'
import {Input}            from '../../components/Input'
import {Alert}            from '../../components/Alert'
import {Button}           from '../../components/Button'
import Cookies            from 'js-cookie'
import {useNavigate}      from 'react-router-dom'
import {getAllIdeasRoute} from '../../lib/routes.ts'

export const SignInPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const navigate = useNavigate()
  const utils = trpc.useUtils()
  // const validationSchema = z.object({
  
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: ''
    },
    validate: values => {
      const rez = zSignInTrpcInput.safeParse(values)
      if (rez.success) return {}
      
      const errors: Record<string, string> = {}
      for (const issue of rez.error.issues) {
        const key = issue.path.join('.')
        if (!errors[key]) errors[key] = issue.message
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const {token} = await signIn.mutateAsync(values)
        Cookies.set('token', token, {expires: 99999})
        utils.getMe.invalidate()
        navigate(getAllIdeasRoute())
        
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    }
  })
  
  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik}/>
          <Input name="password" label="Password" formik={formik} type="password"/>
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Invalid nick or/and password</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
