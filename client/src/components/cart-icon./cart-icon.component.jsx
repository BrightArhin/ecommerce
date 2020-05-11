import React from 'react'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import {toggleDropdown }from "../../redux/cart/cart.actions"
import {connect} from "react-redux"
import {selectCartItemsCount} from "../../redux/cart/cart.selector"
import {createStructuredSelector} from "reselect"


const CartIcon = ({toggleDropdown, itemCount})=>(
    <div  className="cart-icon" onClick={toggleDropdown}>
        <ShoppingIcon  className={'shopping-icon'}/>
        <span className="item-count">{itemCount}</span>
    </div>
)

const mapStateToProps= createStructuredSelector({
    itemCount :selectCartItemsCount
})

const mapDispatchToProps = dispatch=>({
    toggleDropdown : ()=> dispatch(toggleDropdown())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
