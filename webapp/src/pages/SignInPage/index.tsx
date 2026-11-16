import {trpc}             from '../../lib/trpc.tsx'
import {zSignInTrpcInput} from '@at_vite/backend/src/routers/signIn/input.ts'
import {Segment}          from '../../components/Segment'
import {FormItems}        from '../../components/FormItems'
import {Input}            from '../../components/Input'
import {Alert}            from '../../components/Alert'
import {Button}           from '../../components/Button'
import Cookies            from 'js-cookie'
// import {useNavigate}      from 'react-router-dom'
// import {getAllIdeasRoute} from '../../lib/routes.ts'
import {useForm}         from '../../lib/form.tsx'
import {withPageWrapper} from '../../lib/withPageWrapper.tsx'

export const SignInPage = withPageWrapper({
  redirectAuthorized: true
})(() => {
  const signIn = trpc.signIn.useMutation()
  // const navigate = useNavigate()
  const utils = trpc.useUtils()
  const initialValues = {
    nick: '',
    password: ''
  }
  const {formik, buttonProps, alertProps} = useForm({
    initialValues,
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const {token} = await signIn.mutateAsync(values)
      Cookies.set('token', token, {expires: 99999})
      await utils.getMe.invalidate()
      // navigate(getAllIdeasRoute())
    }
  })
  
  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik}/>
          <Input name="password" label="Password" formik={formik} type="password"/>
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
