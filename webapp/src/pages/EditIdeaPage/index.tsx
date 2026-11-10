import {useNavigate, useParams}                     from 'react-router-dom'
import {type EditIdeaRouteParams, getViewIdeaRoute} from '../../lib/routes.ts'
import {trpc}                                       from '../../lib/trpc.tsx'
import type {TrpcRouterOutput}                      from '@at_vite/backend/src/routers'
import {zUpdateIdeaTrpcInput}                       from '@at_vite/backend/src/routers/updateIdea/input.ts'
import {useState}                                   from 'react'
import {useFormik}                                  from 'formik'
import {FormItems}                                  from '../../components/FormItems'
import {Input}                                      from '../../components/Input'
import {Segment}                                    from '../../components/Segment'
import {Textarea}                                   from '../../components/Textarea'
import {Button}                                     from '../../components/Button'
import {Alert}                                      from '../../components/Alert'


// import type {getIdeaTrpcRoute} from '@at_vite/backend/src/routers/getIdea/index.ts'

export const EditIdeaPage = () => {
  const {ideaNick} = useParams() as EditIdeaRouteParams
  // выполнить запрос и передать результат (ИДЕЮ)
  
  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick
  })
  // выполнить запрос и передать результат (компонент контекста ME)
  const getMeResult = trpc.getMe.useQuery()
  // проверка на наличие ИДЕИ и компонента ME
  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }
  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }
  // нет никаких данных по ключу поиска
  if (!getIdeaResult.data) {
    return <span>Data(idea) (dbdata) not found</span>
  }
  if (!getMeResult.data) {
    return <span>Data(Me) (dbdata) not found</span>
  }
  // нет никаких ИДЕЙ по ключу поиска
  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }
  
  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me
  // Is correct ME
  if (!me) {
    return <span>Not authorized</span>
  }
  if (me.id !== idea.authorId) {
    return <span>An idea belongs to another author</span>
  }
  // our data in our component
  return <EditIdeaComponent idea={idea}/>
}

export type IdeaPayload = NonNullable<TrpcRouterOutput['getIdea']['idea']>
// TrpcRouterOutput['getIdea']['idea']
export const EditIdeaComponent = ({
                                    idea
                                  }: {
  idea: IdeaPayload
}) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateIdea = trpc.updateIdea.useMutation()
  const formik = useFormik({
    // initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text
    },
    validate: values => {
      const rez = zUpdateIdeaTrpcInput
        .omit({ideaId: true})
        .safeParse(values)
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
        await updateIdea.mutateAsync({ideaId: idea.id, ...values})
        navigate(getViewIdeaRoute({ideaNick: values.nick}))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    }
  })
  
  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik}/>
          <Input name="nick" label="Nick" formik={formik}/>
          <Input name="description" label="Description" maxWidth={500} formik={formik}/>
          <Textarea formik={formik} label="Text" name="text"/>
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
