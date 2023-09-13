/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./popular.css"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Popular() {
  useEffect(() => {
    getPopular()
    console.log("inEffect")
  }, [localStorage.getItem("popular")]);

  const [popularRecipes, setPopularRecipes] = useState([]);

  const getPopular = async () => {
    const localCheck = localStorage.getItem("popular");
    if (localCheck) {
      setPopularRecipes(JSON.parse(localCheck))
    }
    else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
      );
      const data = await api.json()
      localStorage.setItem("popular", JSON.stringify(data.recipes))
      console.log(data);
      setPopularRecipes(data.recipes)
    }
  }
  const handleRefresh=()=>{
    localStorage.removeItem("popular")
  }
  return (
    <div class="popularRecipeBoard">
      <h1>Popular Recipes</h1>
      <div onClick={handleRefresh}>
        <i class="fa-solid fa-arrows-rotate" ></i>
      </div>
      <Splide options={{
        perPage: 5,
        arrows: false,
        drag: "free",
        gap: "0rem",
        pagination: false
      }
      }>
        {popularRecipes.map(recipe => {
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

export default Popular
