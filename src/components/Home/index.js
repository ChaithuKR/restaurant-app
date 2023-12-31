import './index.css'

import {useEffect, useState} from 'react'

import Items from '../Items'
import DishItem from '../DishItem'

const Home = () => {
  const [itemsList, setItemList] = useState([])
  const [initial, setInitial] = useState('Salads and Soup')
  const [cartCount, setCartCout] = useState(0)
  useEffect(() => {
    const getData = async () => {
      const apiUrl =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(apiUrl)
      const data = await response.json()
      // console.log(data)
      const updatedData = data.map(each => ({
        branchName: each.branch_name,
        nextUrl: each.nexturl,
        restaurantId: each.restaurant_id,
        restaurantImage: each.restaurant_image,
        restaurantName: each.restaurant_name,
        tableId: each.table_id,
        tableMenuList: each.table_menu_list.map(menu => ({
          categoryDishes: menu.category_dishes.map(dish => ({
            addOnCat: dish.addonCat,
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
            dishCalories: dish.dish_calories,
            dishCurrency: dish.dish_currency,
            dishDescriprion: dish.dish_description,
            dishId: dish.dish_id,
            dishImage: dish.dish_image,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            nextUrl: dish.nexturl,
          })),
          menuCategory: menu.menu_category,
          menuCategoryId: menu.menu_category_id,
          menuCategoryImage: menu.menu_category_image,
          nextUrl: menu.nexturl,
        })),
        tableName: each.table_name,
      }))
      setItemList(updatedData)
      // console.log(updatedData)
    }
    getData()
  }, [])

  const setCategory = dishVale => {
    setInitial(dishVale)
  }

  const result = itemsList.map(each =>
    each.tableMenuList
      .filter(item => item.menuCategory === initial)
      .map(filteredItem => filteredItem.categoryDishes),
  )

  // const s = result.map(e => e.map(a => a.map(b => console.log(b))))

  return (
    <div className="bg-container">
      <div className="top">
        {itemsList.map(e => (
          <h1>{e.restaurantName}</h1>
        ))}
        <div className="head-c">
          <p>My Orders</p>
          <p>{cartCount}</p>
        </div>
      </div>
      <ul className="category">
        {itemsList.map(each =>
          each.tableMenuList.map(item => (
            <Items
              key={each.tableMenuList.menuCategoryId}
              data={item}
              setCategoryD={setCategory}
            />
          )),
        )}
      </ul>
      <h1>{initial}</h1>
      <DishItem result={result} />
    </div>
  )
}

export default Home
