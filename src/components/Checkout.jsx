import { useEffect, useState } from "react"
import Input from "./Input"

export default function Checkout({chosenMeals, handleClose}) { 
  const [totalPrice, setTotalPrice] = useState(0);

  async function handleSubmit(event) {
    const fd = new FormData(event.target);
    const customer = Object.fromEntries(fd.entries());
    const order = { order: {
        customer: customer,
        items: chosenMeals
      }
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order)
    }
    const response = await fetch('http://localhost:3000/orders', options);

    console.log(response);
  }

  useEffect(() => {
    function calculateTotalPrice() {
      const price = chosenMeals.reduce((accumulator, meal) => {

        return accumulator + meal.price * (meal.count ?? 1);
      }, 0)

      setTotalPrice(price.toFixed(2));
    }
    calculateTotalPrice();
  }, [meals])

  return (
    <div >
      <h2>Checkout</h2>
      <p>
        Total Amount: ${totalPrice}
      </p>
      <form className="control" onSubmit={handleSubmit}>
        <Input 
          required
          name="name"
          label="Full Name"
        />
        <Input 
          required
          name="email"
          type="email"
          label="Email Address"
        />
        <Input 
          required
          name="street"
          label="Street"
        />
        <Input 
          required
          name="postal-code"
          label="Postal Code"
        />
        <Input 
          required
          name="city"
          label="City"
        />
        <div className="modal-actions">
          <button className="text-button" onClick={handleClose} type="button">
            Close
          </button>
          <button type="submit" className="text-button button">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}