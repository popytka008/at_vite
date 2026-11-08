import {Segment}              from '../../components/Segment'
import {Input}                from '../../components/Input'
import {Textarea}             from '../../components/Textarea'
import {useFormik}            from 'formik'
import {withZodSchema}        from 'formik-validator-zod'
import {trpc}                 from '../../lib/trpc.tsx'
import {zCreateIdeaTrpcInput} from '@at_vite/backend/src/routers/createIdea/input.ts'
import {useState}             from 'react'
import {Alert}  from '../../components/Alert'
import {Button} from '../../components/Button'

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState(null)
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: ''
    },
    validate: withZodSchema(zCreateIdeaTrpcInput as any),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (e: any) {
        setSubmittingError(e.message)
        setTimeout(() => {
          setSubmittingError(e.null)
        }, 3000)
      }
    }
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
        {!formik.isValid && !!formik.submitCount && <div style={{color: 'red'}}>Some fields are invalid</div>}
        {/*{submittingError && <div style={{color: 'red'}}>{submittingError}</div>}*/}
        {submittingError && <Alert color={'red'} children={submittingError}/>}
        {successMessageVisible && <Alert color={'green'} children="Idea created"/>}
        {/*{successMessageVisible && <div style={{color: 'green'}}>Idea created</div>}*/}
        {/*<button type="submit" disabled={formik.isSubmitting}>*/}
        {/*  {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}*/}
        {/*</button>*/}
        <Button loading={formik.isSubmitting}>'Create Idea'</Button>
      </form>
    </Segment>
  )
}

