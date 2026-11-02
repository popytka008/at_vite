import {TrpcProvider}                                            from './lib/trpc.tsx'
import {AllIdeasPage}                                            from './pages/AllIdeasPage'
import {BrowserRouter, Route, Routes}                            from 'react-router-dom'
import {ViewIdeaPage}                                            from './pages/ViewIdeaPage'
import {getAllIdeasRoute, getViewIdeaRoute, viewIdeaRouteParams} from './lib/route.ts'
import {Layout}                                                  from './components/Layout'
import './styles/global.scss'

export const App = () =>{
  
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage/>}/>
            <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}