import {trpc} from '../../lib/trpc'

export const AllIdeasPage = () => {
  
  const result = trpc.ideas.getIdeas.useQuery()
  console.log(result)
  
  if (result.isPending) {
    return <div className="loading">Грузимся... грузимся...</div>
  }
  if (result.isError) {
    return (<div className="error">{result.error.message}</div>)
  }
  
  return (
    <div>
      <h1>Ideas!</h1>
      {result.data.ideas.map((idea) => (
        <div key={idea.nick}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
