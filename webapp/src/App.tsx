import {TrpcProvider}                 from './lib/trpc.tsx'
import {AllIdeasPage}                 from './pages/AllIdeasPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ViewIdeaPage}                 from './pages/ViewIdeaPage'
import * as routes                    from './lib/routes.ts'
import {Layout}                       from './components/Layout'
import './styles/global.scss'
import {NewIdeaPage}                  from './pages/NewIdeaPage'

export const App = () => {
  
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage/>}/>
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage/>}/>
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}