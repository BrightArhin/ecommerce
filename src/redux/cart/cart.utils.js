export const safelyAddCartItem = (cartItems, cartItemToAdd)=>{
    const isExisting = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
//Check if item to be updated exists in the array, if true ,
// return a new version(updated properties) of the object else return the object if its not a match
    if(isExisting){
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ?
               {...cartItem , quantity: cartItem.quantity+1} : cartItem
        )
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove)=>{
    const existingCartItem =  cartItems.find(cartItem => cartItem.id === cartItemToRemove.id )

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ?
            {...cartItem , quantity: cartItem.quantity -1 } :
            cartItem
    )
}
