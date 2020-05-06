import React from 'react'
import './checkout-item.styles.scss'
import {addItemToCart, clearItemFromCart, removeItem} from "../../redux/cart/cart.actions"
import {connect} from 'react-redux'

const CheckOutItem = ({cartItem ,clearItemFromCart, addItem,removeItem})=>{
    const {name,quantity,price,imageUrl} = cartItem
    return(
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt=""/>
        </div>

        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={ ()=>removeItem(cartItem) }> &#10094; </div>
               <span className="value">{quantity}</span>
            <div className="arrow" onClick={ ()=>addItem(cartItem) }> &#10095; </div>
        </span>
        <span className="price">{price}</span>

        <div className="remove-button" onClick={()=>clearItemFromCart(cartItem)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps = dispatch =>( {
    clearItemFromCart : item => dispatch(clearItemFromCart(item)),
    addItem : item => dispatch(addItemToCart(item)),
    removeItem : item=> dispatch(removeItem(item))
})

export default connect(null,mapDispatchToProps)(CheckOutItem)
