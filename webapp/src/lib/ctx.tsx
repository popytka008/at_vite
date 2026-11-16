import type {TrpcRouterOutput}     from '@at_vite/backend/src/routers'
import {createContext, useContext} from 'react'
import {trpc}                      from './trpc.tsx'

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me']
}

const AppReactContext = createContext<AppContext>({
  me: null
})

export const AppContextProvider = ({children}: { children: React.ReactNode }) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError
  } = trpc.getMe.useQuery()
  let query = isLoading || isFetching
  return (
    <AppReactContext.Provider value={{me: data?.me || null}}>
      {query ? <p>Loading...</p> : isError ? <p>Error:{error.message} </p> : children}
    </AppReactContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppReactContext)
}

export const useMe = () => {
  const {me} = useAppContext()
  return me
}