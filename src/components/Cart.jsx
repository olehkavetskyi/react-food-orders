import { useEffect, useState } from 'react';

export default function Cart({setModalState, meals, setMeals, handleClose}) {
  const [totalPrice, setTotalPrice] = useState(0);

  function handleGoToCheckout() {
    setModalState('checkout')
  }

  function handleAddMeal(id) {
    setMeals((meals) => {
      meals.find(m => m.id === id).count = meals.find(m => m.id === id).count + 1;

      return [
        ...meals
      ];
    })
  }

  function handleSubstructMeal(id) {
    setMeals((meals) => {
      if (meals.find(m => m.id === id).count == 1) {
        const index = meals.findIndex(meal =>meal.id === id);
        meals.splice(index, 1);
      } else {
        meals.find(m => m.id === id).count = meals.find(m => m.id === id).count - 1;
      }

      return [
        ...meals
      ];
    })
  }

  useEffect(() => {
    function calculateTotalPrice() {
      const price = meals.reduce((accumulator, meal) => {
        return accumulator + meal.price * (meal.count);
      }, 0)

      setTotalPrice(price.toFixed(2));
    }
    calculateTotalPrice();
  }, [meals])

  return (
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {meals && meals.map((meal, i) => (
            <li key={i} className="cart-item">
              <p>
                {meal.name} - {meal.count} x {meal.price}
              </p>
              <div className='cart-item-actions'>
                <button onClick={() => handleSubstructMeal(meal.id)}>-</button>
                <p>
                  {meal.count}
                </p>
                <button onClick={() => handleAddMeal(meal.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-total">
          ${totalPrice}
        </p>
        <div className="modal-actions">
          <button 
            className="text-button"
            onClick={handleClose}
          >
            Close
          </button>
          <button 
            onClick={handleGoToCheckout}
            className="button text-button"
          >
            Go to Checkout
          </button>
        </div>
      </div>
  );
}