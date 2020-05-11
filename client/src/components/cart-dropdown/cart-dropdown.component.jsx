import React from "react"
import './cart-dropdown.styles.scss'
import CustomButton from "../custom-button/custom-button.component"
import {connect} from "react-redux"
import CartItem from "../cartItem/cart-item.component"
import {selectCartItems} from "../../redux/cart/cart.selector"
import {createStructuredSelector} from "reselect"
import {withRouter} from 'react-router-dom'
import {toggleDropdown} from "../../redux/cart/cart.actions"

const CartDropdown = ({cartItems, history, dispatch})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                    cartItems.map(cartItem=>(
                      <CartItem key={cartItem.id} item={cartItem}/>
                    ))
                  :   (<span className={'empty-message'}>Your Cart is empty</span>)
            }
        </div>
        <CustomButton onClick={
            ()=>{
                history.push('/checkout')
                dispatch(toggleDropdown())
            }
        }>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
})

export default withRouter(connect(mapStateToProps,null)(CartDropdown))
