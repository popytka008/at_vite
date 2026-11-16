import {Segment} from '../Segment'
import {Alert}   from '../Alert'

export const ErrorPageComponent = (
  {
    title = 'Oops, error',
    message = 'Some went wrong'
  }: {
    title?: string
    message?: string
  }) => {
  return (
    <Segment title={title}><Alert color="red">{message}</Alert></Segment>
  )
}