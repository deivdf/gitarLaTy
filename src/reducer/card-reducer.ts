import { db } from "../data/db";
import { Guitar, CartItem } from "../types";

export type cardActions = 
{ type: 'add-to-card', payload: {item: Guitar}} |
{ type: 'remove-to-card', payload: {id: Guitar['id']}} |
{ type: 'decrease-quantity', payload: {id: Guitar['id']}} |
{ type: 'increase-quantity', payload: {id: Guitar['id']}} |
{ type: 'clear-card' }


export type CardState ={
    data: Guitar[],
    card: CartItem[]
}
export const initialSate: CardState = {
    data: db,
    card:[]
}
const MIN_ITEMS = 1
const MAX_ITEMS = 5
export const CardReducer = (
    //para el auto completado
    state: CardState = initialSate,
    action: cardActions
)=>{
    if(action.type === 'add-to-card'){
        //logica
        const itemExists = state.card.find(guitar => guitar.id === action.payload.item.id)
        let updatedCart: CartItem[] = []
        if(itemExists) { // existe en el carrito
            updatedCart = state.card.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                }else{
                    return item
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updatedCart = [...state.card, newItem]
        }
        //lo que hace el newcardItem setCart lo hace el return
        return{
            ...state,
            card: updatedCart
        }
    }
    else if(action.type === 'remove-to-card'){
        //filtra los datos para obtener lo que se eliminara
        const updatedCart = state.card.filter(item => item.id !== action.payload.id);
        //retorna una copia de el state y el id a eliminar
        return {
            ...state,
            card: updatedCart
        }
    }
    if(action.type === 'decrease-quantity'){
        const decreaseItem = state.card.map(item =>{
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return {
            ...state,
            card: decreaseItem
        }
    }
    if(action.type === 'increase-quantity'){
        const increaseItem = state.card.map(item =>{
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity ++
                }
            }
            return item
        })
        return{
            ...state,
            card: increaseItem
        }

    }
    if(action.type === 'clear-card'){
        state.card = []
        return state
    }

}