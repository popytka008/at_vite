import {Segment}              from '../../components/Segment'
import {Input}                from '../../components/Input'
import {Textarea}             from '../../components/Textarea'
import {trpc}                 from '../../lib/trpc.tsx'
import {zCreateIdeaTrpcInput} from '@at_vite/backend/src/routers/createIdea/input.ts'
import {Alert}  from '../../components/Alert'
import {Button}          from '../../components/Button'
import {useForm}         from '../../lib/form.tsx'
import {withPageWrapper} from '../../lib/withPageWrapper.tsx'

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true
})(() => {
  const createIdea = trpc.createIdea.useMutation()
  const initialValues = {
    name: '',
    nick: '',
    description: '',
    text: ''
  }
  const {formik, buttonProps, alertProps} = useForm({
    initialValues,
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
        await createIdea.mutateAsync(values)
        formik.resetForm()
    },
    successMessage: 'Idea created!',
    showValidationAlert: true
  })
  
  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik}/>
        <Input name="nick" label="Nick" formik={formik}/>
        <Input name="description" label="Description" formik={formik} maxWidth={500}/>
        <Textarea name="text" label="Text" formik={formik}/>
        <Alert {...alertProps} />
        <Button {...buttonProps}>Create idea</Button>
      </form>
    </Segment>
  )
})

