// import {AllIdeasPage} from './pages/AllIdeasPage'

import {TrpcProvider} from './lib/trpc.tsx'
import {AllIdeasPage} from './pages/AllIdeasPage'

// export const AllIdeasPage = () => {
// const ideas = [
//   {nick: 'cool-idea-nick-1', name: 'Idea 1', description: 'Description of idea 1..'},
//   {nick: 'cool-idea-nick-2', name: 'Idea 2', description: 'Description of idea 2..'},
//   {nick: 'cool-idea-nick-3', name: 'Idea 3', description: 'Description of idea 3..'},
// ]
//   return (
//     <div>
//       <h1>Ideas!</h1>
//       {ideas.map((idea) => (
//         <div key={idea.nick}>
//           <h2>{idea.name}</h2>
//           <p>{idea.description}</p>
//         </div>
//       ))}
//     </div>
//   )}
//
export const App = () =>{
  return (
    <TrpcProvider><AllIdeasPage/></TrpcProvider>
  )
}