import {useNavigate, useParams}                     from 'react-router-dom'
import {type EditIdeaRouteParams, getViewIdeaRoute} from '../../lib/routes.ts'
import {trpc}                                       from '../../lib/trpc.tsx'
import {zUpdateIdeaTrpcInput}                       from '@at_vite/backend/src/routers/updateIdea/input.ts'
import {FormItems}                                  from '../../components/FormItems'
import {Input}                                      from '../../components/Input'
import {Segment}                                    from '../../components/Segment'
import {Textarea}                                   from '../../components/Textarea'
import {Button}                                     from '../../components/Button'
import {Alert}                                      from '../../components/Alert'
import {useForm}                             from '../../lib/form.tsx'
import {AnotherAuthorError, withPageWrapper} from '../../lib/withPageWrapper.tsx'
// import {ErrorPageComponent}                  from '../../components/ErrorPageComponent'

// export type IdeaPayload = NonNullable<TrpcRouterOutput['getIdea']['idea']>
// TrpcRouterOutput['getIdea']['idea']
export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const {ideaNick} = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({ideaNick})
  },
  checkExists: ({queryResult}) => !!queryResult.data,
  checkExistsMessage: 'Dataset not exists',
  setProps: ({
               queryResult,
               ctx,
               checkExists,
               checkAccess
             }) => {
    const idea = checkExists(queryResult.data!.idea, 'idea does not exists')
    
    checkAccess(ctx.me, 'An idea can only by edited by authorized person')
    
    if (ctx.me!.id !== idea.authorId) {
      throw new AnotherAuthorError('An idea can only by edited by own author')
    }
    
    return {idea}
  }
})(({idea}) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const initialValues = {
    name: idea.name,
    nick: idea.nick,
    description: idea.description,
    text: idea.text
  }
  const {formik, buttonProps, alertProps} = useForm({
    initialValues,
    validationSchema: zUpdateIdeaTrpcInput.omit({ideaId: true}),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ideaId: idea.id, ...values})
      navigate(getViewIdeaRoute({ideaNick: values.nick}))
    },
    resetOnSuccess: false,
    showValidationAlert: true
  })
  
  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik}/>
          <Input name="nick" label="Nick" formik={formik}/>
          <Input name="description" label="Description" maxWidth={500} formik={formik}/>
          <Textarea formik={formik} label="Text" name="text"/>
          <Alert {...alertProps}/>
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
