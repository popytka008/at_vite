import {trpc}           from '../../lib/trpc.tsx'
import {useNavigate}    from 'react-router-dom'
import {getSignInRoute} from '../../lib/routes.ts'
import {useEffect}      from 'react'
import Cookies          from 'js-cookie'

export const SignOutPage = () => {
  const navigate = useNavigate()
  const utils = trpc.useUtils()
  useEffect(() => {
    Cookies.remove('token')
    utils.getMe.invalidate()
      .then(() => {
        navigate(getSignInRoute()/*, {replace: true}*/)
      })
  }, [])
  
  return <p>Loading...</p>
}