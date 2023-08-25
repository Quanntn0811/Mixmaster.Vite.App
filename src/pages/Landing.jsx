import axios from 'axios'
import { useLoaderData } from 'react-router-dom'
import SearchForm from '../components/SearchForm'
import CocktailList from '../components/CocktailList'
import { QueryClient, useQuery } from '@tanstack/react-query'

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url)
    const searchTerm = url.searchParams.get('search') || ''
    //const data = await axios.get(cocktailSearchUrl + searchTerm)
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
    //return { drinks: data.data.drinks, searchTerm }
    return { searchTerm }
  }

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const resp = await axios.get(cocktailSearchUrl + searchTerm)
      return resp.data.drinks
    },
  }
}

const Landing = () => {
  const { searchTerm } = useLoaderData()
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm))

  return (
    <section>
      <SearchForm searchTerm={searchTerm}></SearchForm>
      <CocktailList drinks={drinks}></CocktailList>
    </section>
  )
}
export default Landing
