import {TrpcProvider}                 from './lib/trpc.tsx'
import {AllIdeasPage}                 from './pages/AllIdeasPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ViewIdeaPage}                 from './pages/ViewIdeaPage'
import * as routes                    from './lib/routes.ts'
import {Layout}                       from './components/Layout'
import {NewIdeaPage} from './pages/NewIdeaPage'
import {SignUpPage}  from './pages/SignUpPage'
import {SignInPage}  from './pages/SignInPage'
import {SignOutPage}  from './pages/SignOutPage'
import {EditIdeaPage} from './pages/EditIdeaPage'
import './styles/global.scss'
import {AppContextProvider} from './lib/ctx.tsx'
import {NotFoundPage}       from './pages/NotFoundPage'

export const App = () => {
  
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage/>}/>
          <Route element={<Layout/>}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage/>}/>
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage/>}/>
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage/>}/>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage/>}/>
            <Route path={routes.getSignInRoute()} element={<SignInPage/>}/>
            <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}