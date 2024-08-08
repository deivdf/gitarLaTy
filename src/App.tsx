import { useEffect, useReducer } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
//import { useCart } from './hooks/useCart'
import { CardReducer, initialSate } from "./reducer/card-reducer"

function App() {
  /*const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()
  //recorrrido con UseState
          <div className="row mt-5">
              {data.map((guitar) => (
                  <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                  />
              ))}
          </div>
          //componentes antes de useReducer
        <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
  */
  const [state, dispatch] = useReducer(CardReducer,initialSate);
  console.log(dispatch)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state?.card))
}, [state?.card])
  return (
    <>
      {state && (<Header 
        card={state.card}
        dispatch={dispatch}
      />)}
      
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {state?.data.map((guitar: any) => (
                  <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    dispatch={dispatch}
                    //addToCart={addToCart}
                  />
              ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
