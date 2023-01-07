import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import {ReactComponent as CrwnLogo} from "../../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
    return(
      <Fragment>
        <div className="navigation">
            <Link to="/">
                <CrwnLogo className="logo" >Logo</CrwnLogo>
            </Link>
            <div className="nav-links-container">
                <Link to="/shop" className="nav-link">
                SHOP
                </Link>
                <Link className="nav-link" to="/auth">
                    SIGN IN
                </Link>

            </div>
        </div>
        <Outlet/>
      </Fragment>
    );
  };
  export default Navigation;