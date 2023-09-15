/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./popular.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useGetAllData, useUpdateData } from "../queries/data";

function Popular() {
  const { data: recipes, refetch } = useGetAllData();
  const { mutateAsync: updateLocalData, data: recipies } = useUpdateData();

  useEffect(() => {
    if (recipes?.length) {
      updateLocalData({ payload: recipes });
    }
  }, [recipes]);
  const handleRefresh = () => {
    refetch();
  };

  const updateLikedData = (id) => {
    if (id) {
      updateLocalData({ payload: recipes, likeId: id });
    }
  };
  return (
    <div class="popularRecipeBoard">
      <h1>Popular Recipes</h1>
      <div onClick={handleRefresh}>
        <i class="fa-solid fa-arrows-rotate"></i>
      </div>
      <Splide
        options={{
          perPage: 5,
          arrows: false,
          drag: "free",
          gap: "0rem",
          pagination: false,
        }}
      >
        {recipies &&
          recipies?.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="recipeCard">
                  <div className="imageHolder">
                    <img src={recipe.image} alt="hi"></img>
                  </div>

                  <div className="recipeThumbnail">
                    <div className="detailDisplay">
                      <>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => updateLikedData(recipe.id)}
                          class="fa-regular fa-heart"
                        ></i>
                        <p className="spaceBetweenIcon">
                          {recipe.aggregateLikes}
                        </p>
                      </>
                      <>
                        <i class="gg-time"></i>
                        <p className="spaceBetweenIcon">
                          {recipe.readyInMinutes} min
                        </p>
                      </>
                    </div>
                    <div className="bottomRecipeBoard">
                      <div className="recipeTitle">
                        <p>{recipe.title}</p>
                      </div>
                      <div className="calorieDiv">
                        <i class="fa-solid fa-fire"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
      </Splide>
      {/* setIndex(0) */}
    </div>
  );
}

export default Popular;
