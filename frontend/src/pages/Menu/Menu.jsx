import React, { useState, useEffect, useContext } from 'react'
import './Menu.css'
import PageHero from '../../components/PageHero/PageHero'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { StoreContext } from '../../context/StoreContext'

const Menu = () => {
  const { food_list } = useContext(StoreContext);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from food_list
    if (food_list && food_list.length > 0) {
      const uniqueCategories = [...new Set(food_list.map(item => item.category))];
      setCategories(uniqueCategories);
      
      // Set the first category as default
      if (uniqueCategories.length > 0 && !category) {
        setCategory(uniqueCategories[0]);
      }
    }
  }, [food_list]);

  return (
    <div className="menu-page">
      <PageHero 
        header="Explore our menu"
        title="Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time."
      />
      <div className="menu-content-wrapper">
        <ExploreMenu 
          category={category} 
          setCategory={setCategory}
          categories={categories}
        />
        <FoodDisplay category={category}/>
      </div>
    </div>
  )
}

export default Menu
