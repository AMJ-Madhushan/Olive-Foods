import React, { useState } from 'react'
import './Menu.css'
import PageHero from '../../components/PageHero/PageHero'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Menu = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <PageHero 
        header="Explore our menu"
        title="Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time."
      />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Menu
