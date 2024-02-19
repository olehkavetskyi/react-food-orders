import { useEffect, useState } from "react";

import Header from "./components/Header";
import MealItem from "./components/MealItem";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Modal from './components/Modal';

const apiUrl = 'http://localhost:3000';

function App() {
  const [meals, setMeals] = useState([]);
  const [modalState, setModalState] = useState('closed');
  const [chosenMeals, setChosenMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const response = await fetch(`${apiUrl}/meals`);

      setMeals(await response.json());
    }
    getMeals();
  }, []);

  function handleModalClose() {
    setModalState('closed')
  }

  function handleCartClick() {
    setModalState('cart');
  }

  function isChosen(id) {
    return chosenMeals.find(meal => meal.id === id);
  }

  return (
    <>
      <Header 
        handleCartClick={handleCartClick}
        count={chosenMeals.length}
      />
      {
        modalState !== 'closed' && (
          <Modal open={modalState !== 'closed'}>
            {
              modalState === 'cart' && (
                <Cart
                  setModalState={setModalState}
                  meals={chosenMeals}
                  setMeals={setChosenMeals}
                  handleClose={handleModalClose}
                />
              )
            }
            {
              modalState === 'checkout' && (
                <Checkout
                  chosenMeals={chosenMeals}
                  handleClose={handleModalClose}
                />
              )
            }
          </Modal>
        )
      }
      <div id="meals">
        {meals.map((meal, i) => (
          <MealItem 
            key={i}
            id={meal.id}
            image={`${apiUrl}/${meal.image}`}
            name={meal.name}
            price={meal.price}
            description={meal.description}
            isChosen={isChosen(meal.id)}
            setChosenMeals={setChosenMeals}
          />
        ))}
      </div>
    </>
  );
}

export default App;
