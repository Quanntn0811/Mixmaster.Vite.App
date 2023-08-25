import { useLoaderData, Link, Navigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/CocktailPage'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
useQuery

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const singleCockTailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(cocktailSearchUrl + id)
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id
    await queryClient.ensureQueryData(singleCockTailQuery(id))
    return { id }
  }

const Cocktail = () => {
  const { id } = useLoaderData()
  const { data } = useQuery(singleCockTailQuery(id))

  if (!data) {
    toast.error('id does not exist')
    return <Navigate to="/"></Navigate>
  }

  const drink = data.drinks[0]

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = drink

  const ingredients = Object.keys(drink)
    .filter((key) => key.startsWith('strIngredient') && drink[key] !== null)
    .map((key) => drink[key])

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients.map((ingredient, index) => {
              return (
                <span className="ing" key={ingredient}>
                  {ingredient}
                  {index < ingredients.length - 1 && ','}
                </span>
              )
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
export default Cocktail
