import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import {ReactComponent as CrwnLogo} from "../../../assets/crown.svg";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";
import { selectIsCartOpen } from "../../../store/cart/cart.selector";
import { signOutStart } from "../../../store/user/user.action";

const Navigation = () => {
    
    const currentUser =  useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const signOutHandler = () => dispatch(signOutStart())

    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo" >Logo</CrwnLogo>
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop" >
                SHOP
                </NavLink>
                {
                  currentUser ? (
                    <NavLink as="span"  onClick={signOutHandler}>SIGN OUT</NavLink>
                  ) : (
                    <NavLink  to="/auth">
                  SIGN IN
                  </NavLink>)
                }
                <CartIcon />
            </NavLinks>
            {
              isCartOpen && <CartDropdown />
            }
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
  };
  export default Navigation;