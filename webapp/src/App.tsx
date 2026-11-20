import {TrpcProvider}                 from './lib/trpc.tsx'
import {AllIdeasPage}    from './pages/ideas/AllIdeasPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ViewIdeaPage}    from './pages/ideas/ViewIdeaPage'
import * as routes                    from './lib/routes.ts'
import {Layout}          from './components/Layout'
import {NewIdeaPage}     from './pages/ideas/NewIdeaPage'
import {SignUpPage}      from './pages/auth/SignUpPage'
import {SignInPage}      from './pages/auth/SignInPage'
import {SignOutPage}     from './pages/auth/SignOutPage'
import {EditIdeaPage}    from './pages/ideas/EditIdeaPage'
import {AppContextProvider} from './lib/ctx.tsx'
import {NotFoundPage}    from './pages/others/NotFoundPage'
import './styles/global.scss'
import {EditProfilePage} from './pages/auth/EditProfilePage'

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
            <Route path={routes.getEditProfileRoute()} element={<EditProfilePage/>}/>
            <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}