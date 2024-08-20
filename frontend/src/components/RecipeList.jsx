import RecipeCard from "./RecipeCard"

const RecipeList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-6">
      {recipes &&
        recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
    </div>
  )
}

export default RecipeList
