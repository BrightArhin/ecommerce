import cartActionTypes from "./cart.types"

export const toggleDropdown = ()=> {
    return {
        type : cartActionTypes.TOGGLE_DROPDOWN,
    }
}

export const addItemToCart = (item)=>({
    type : cartActionTypes.ADD_ITEM,
    payload : item
})

export const removeItem =(item)=>({
    type : cartActionTypes.REMOVE_ITEM,
    payload : item
})


export const clearItemFromCart = (item)=>({
    type : cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload : item
})


