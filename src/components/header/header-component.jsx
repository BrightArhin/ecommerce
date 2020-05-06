import React from "react"
import './header.styles.scss'
import {Link} from "react-router-dom"
import {ReactComponent as Logo} from "../../assets/crown.svg"
import {auth} from '../../firebase/firebase-utils'
import {connect} from 'react-redux'

import CartIcon from "../cart-icon./cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import {selectCurrentUser} from "../../redux/user/user.selectors"
import {selectHiddenDropdown} from "../../redux/cart/cart.selector"
import {createStructuredSelector} from "reselect"


const Header =({currentUser, hidden})=>(
    <div className="header">
        <Link  className="logo-container" to='/'>
          <Logo className='logo'/>
        </Link>

        <div className="options">
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {
                currentUser ?
                    (<div className={'option'} onClick={()=> auth.signOut()}>
                       SIGNOUT
                    </div>):
                   ( <Link className={'option'} to={'/signin'}>
                        SIGNIN
                    </Link>)
            }
            <CartIcon />
        </div>
        {
            hidden ? null  : (<CartDropdown/>)
        }

    </div>
)

const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        hidden : selectHiddenDropdown
})


export default connect(mapStateToProps,null)(Header)
