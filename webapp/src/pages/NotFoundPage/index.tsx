import {ErrorPageComponent} from '../../components/ErrorPageComponent'

export const NotFoundPage = ({
                               title = 'Not found',
                               message = 'The page does not exists'
                             }: {
  title?: string
  message?: string
}) => <ErrorPageComponent title={title} message={message}/>

