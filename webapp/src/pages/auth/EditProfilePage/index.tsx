import {withPageWrapper}          from '../../../lib/withPageWrapper.tsx'
import {trpc}                     from '../../../lib/trpc.tsx'
import {useForm}                  from '../../../lib/form.tsx'
import {zUpdateProfileTrpcInput}  from '@at_vite/backend/src/routers/auth/updateProfile/input.ts'
import {zUpdatePasswordTrpcInput} from '@at_vite/backend/src/routers/auth/updatePassword/input.ts'
import {FormItems}                from '../../../components/FormItems'
import {Segment}                  from '../../../components/Segment'
import {Input}                    from '../../../components/Input'
import {Alert}                    from '../../../components/Alert'
import {Button}                   from '../../../components/Button'
import type {GetMeType}           from '@at_vite/backend/src/routers'
import {z}                        from 'zod'


const General = ({me}: { me: GetMeType }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const initialValues = {
    nick: me.nick,
    name: me.name
  }
  const {formik, alertProps, buttonProps} = useForm({
    initialValues,
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updateMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, {me: updateMe})
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false
  })
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input name="nick" label="Nick" formik={formik}/>
        <Input name="name" label="Name" formik={formik}/>
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}


const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: ''
  }
  const {formik, alertProps, buttonProps} = useForm({
    initialValues,
    validationSchema: zUpdatePasswordTrpcInput
      .extend({newPasswordAgain: z.string().min(1)})
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['newPasswordAgain']
          })
        }
      }),
    onSubmit: async ({newPassword, oldPassword}) => {
      await updatePassword.mutateAsync({newPassword, oldPassword})
    },
    successMessage: 'Password updated',
    resetOnSuccess: true
  })
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input name="oldPassword" label="Old Password" type="password" formik={formik}/>
        <Input name="newPassword" label="New Password" type="password" formik={formik}/>
        <Input name="newPasswordAgain" label="New Password Again" type="password" formik={formik}/>
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  )
}


export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({getAuthorizedMe}) =>
    ({me: getAuthorizedMe()})
})(({me}) => {
  return (
    <Segment title="Edit Profile">
      <Segment title="General part (profile)" size={2}>
        <General me={me}/>
      </Segment>
      <Segment title="Password update" size={2}>
        <Password/>
      </Segment>
    </Segment>
  )
})