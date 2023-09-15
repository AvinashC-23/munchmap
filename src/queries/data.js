import { useQuery , useMutation } from "react-query";
import QueryKeys from "./keys";

const getData = async () => {
  const api = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
  );
  const data = await api.json();
  return data?.recipes;
};

export const useGetAllData = () => {
  return useQuery([QueryKeys.GET_ALL_DATA], () => getData(), {
    enabled: true,
  });
};

const getLocalData = async () => {
  const api = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
  );
  const data = await api.json();
  return data?.recipes;
};

export const useGetLocalData = () => {
  return useQuery([QueryKeys.GET_LOCAL_DATA], () => getData(), {
    enabled: true,
  });
};

const updateData = (data) => {
    let updatedData = data?.payload;
    if(data.likeId){
        const filteredData = updatedData?.findIndex(recipe => recipe.id === data.likeId);
        updatedData[filteredData]["aggregateLikes"] += 1;
    }
    return updatedData
};

export const useUpdateData = () => {
  return useMutation(updateData, {
    onError: (error) => null,
  });
};
