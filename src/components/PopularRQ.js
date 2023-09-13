// // import React, { useEffect } from 'react'
// import { useQuery } from 'react-query'
// import axios from "axios"


// function PopularRQ() {
//   const {data, isLoading}=useQuery("popularRecipes", async ()=>{
//     return await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`)
//   }
// )
// // useEffect()
//   console.log(isLoading)
//   console.log(data)

//   if (isLoading){
//     return (<h2>Loading.....</h2>)
//   }

//   return (
//     <div>
//       <h1>Popular REcipes from RQ</h1>
//       {data.data.recipes.map(recipe=>{
//         return(
//           <h3 key={recipe.id}>{recipe.title}</h3>
//         )
//       })}
//     </div>
//   )
// }

// export default PopularRQ




import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "./popular.css"


function PopularRQ() {

  const { data, isLoading,refetch} = useQuery("popularRecipes", async () => {
    return await axios.get( `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`)
  });
  // console.log(data)
  useEffect(() => {
   refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refetch]); 

  if (isLoading) {
    return <h2>Loading.....</h2>
  }
  const handleRefresh=()=>{
    localStorage.removeItem("popular")
  }

  return (
    <div class="popularRecipeBoard"> 
    <h1>Popular Recipes RQ</h1>
    <i class="fa-solid fa-arrows-rotate" onClick={handleRefresh}></i>
    <Splide options={{
      perPage: 5,
      arrows: false,
      drag: "free",
      gap: "0rem",
      pagination: false
    }
    }>
      {data.data.recipes.map(recipe => {
        // if(recipe.aggregateLikes > 1000)
        return (
          <SplideSlide key={recipe.id}>
            <div className='recipeCard'>

              <div className='imageHolder'>
                <img src={recipe.image} alt='hi'></img>
              </div>

              <div className='recipeThumbnail'>
                <div className="detailDisplay">
                  <>
                    <i class="fa-regular fa-heart" ></i>
                    <p className='spaceBetweenIcon'>{recipe.aggregateLikes}</p>
                  </>
                  <>
                  <i class="gg-time"></i>
                  <p className='spaceBetweenIcon'>{recipe.readyInMinutes} min</p>
                  </>
                </div>
                <div className='bottomRecipeBoard'>
                  <div className='recipeTitle'>
                    <p>{recipe.title}</p>
                  </div>
                  <div className='calorieDiv'>
                    <i class="fa-solid fa-fire"></i>
                  </div>
                </div>              
              </div>
            </div>
            
          </SplideSlide>
        )
      })
      }
    </Splide>
    {/* setIndex(0) */}
  </div>
  )
}

export default PopularRQ;
