import Wrapper from '../assets/wrappers/CocktailList'
import CocktailCard from './CocktailCard'

const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return (
      <h4 style={{ textAlign: 'center' }}>No Matching Cocktails Found...</h4>
    )
  }

  const formattedDrinks = drinks.map((item) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    }
  })

  return (
    <Wrapper>
      {formattedDrinks.map((drink) => {
        return <CocktailCard key={drink.id} {...drink}></CocktailCard>
      })}
    </Wrapper>
  )
}
export default CocktailList
