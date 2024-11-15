// FavoriteContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

//crea contexto Favoritos
const FavoriteContext =createContext();

export const useFavorites = () =>{
    return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
    // Estado inicial de los favoritos (se recupera de localStorage si existe)
    const [favorites, setFavorites] = useState(() => {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    });


useEffect (()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
},[favorites])

const addFavorite = useCallback((product) => {
    setFavorites((prevFavorites) => {
        if (!prevFavorites.some((item) => item.id === product.id)) {
            return [...prevFavorites, product];
        }
        return prevFavorites;
    });
}, []);

const removeFavorite=(productId)=>{
    setFavorites((prevFavorites)=> prevFavorites.filter((item)=>item.id!==productId));
};
return(
    <FavoriteContext.Provider value={{favorites,addFavorite,removeFavorite}}>
        {children}
    </FavoriteContext.Provider>
);
};