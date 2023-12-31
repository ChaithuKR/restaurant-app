import './index.css'

import {useState} from 'react'

const DishItem = props => {
  const {result} = props
  const s = result.map(e => e.map(a => a.map(b => console.log(b))))
  const [dishCount, setDishCount] = useState(0)

  const onIncDishCount = () => {
    setDishCount(dishCount + 1)
  }

  const onDecDishCount = () => {
    setDishCount(dishCount - 1)
  }

  return (
    <div>
      {result.map(e =>
        e.map(a =>
          a.map(b => (
            <div className="item-card">
              <div className="text">
                <h3>{b.dishName}</h3>
                <p>
                  {b.dishCurrency} {b.dishPrice}
                </p>
                <p>{b.dishDescriprion}</p>
                {b.dishAvailability ? (
                  <div className="buttons">
                    <button className="button" onClick={onDecDishCount}>
                      -
                    </button>
                    <p>{dishCount}</p>
                    <button className="button" onClick={onIncDishCount}>
                      +
                    </button>
                  </div>
                ) : (
                  <p>Not available</p>
                )}

                {b.addOnCat.length > 0 && <p>Customizations available</p>}
              </div>
              <p>{b.dishCalories} Calories</p>
              <img src={b.dishImage} alt="dish" className="item-image" />
            </div>
          )),
        ),
      )}
    </div>
  )
}

export default DishItem
