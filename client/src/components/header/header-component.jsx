import React from "react"

import {ReactComponent as Logo} from "../../assets/crown.svg"
import {connect} from 'react-redux'

import CartIcon from "../cart-icon./cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import {selectCurrentUser} from "../../redux/user/user.selectors"
import {selectHiddenDropdown} from "../../redux/cart/cart.selector"
import {createStructuredSelector} from "reselect"
import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles"
import {signOutStart} from "../../redux/user/user.actions"

const Header =({currentUser, hidden,signOutStart})=>(
    <HeaderContainer >
        <LogoContainer   to='/'>
          <Logo className='logo'/>
        </LogoContainer>

        <OptionsContainer >
            <OptionLink  to='/shop'>SHOP</OptionLink>
            <OptionLink  to='/contact'>CONTACT</OptionLink>
            {
                currentUser ?
                    (<OptionLink as={'div'}  onClick={signOutStart}>
                       SIGNOUT
                    </OptionLink>):
                   (<OptionLink  to={'/signin'}>
                        SIGNIN
                    </OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null  : (<CartDropdown/>)
        }

    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        hidden : selectHiddenDropdown
})

const mapDispatchToProps = dispatch=> ({
    signOutStart : ()=>dispatch(signOutStart())
})


export default connect(mapStateToProps,mapDispatchToProps)(Header)
