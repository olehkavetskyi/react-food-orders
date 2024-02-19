export default function MealItem({id, image, name, price, description, isChosen, setChosenMeals}) {
  function handleAddToCart() {
    setChosenMeals((prev) => {
      return [
        ...prev,
        {id, name, price, description, image, count: 1}
      ]
    })
  }

  return (
    <article className="meal-item">
        <img src={image} alt="Image" />
        <h3>
          {name}
        </h3>
        <div className="meal-item-price">
          ${price}
        </div>
        <div className="meal-item-description">
          {description}
        </div>
        <div className="meal-item-actions">
          {!isChosen &&
            <button 
              className="button"
              onClick={handleAddToCart} 
            >
              Add to Cart
            </button>
          }
          {isChosen && 
            <p>
              In a Cart
            </p>
          }
        </div>
    </article>
  );
}