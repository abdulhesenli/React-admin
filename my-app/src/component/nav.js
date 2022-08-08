import { NavLink } from "react-router-dom";
import './menu.css'
import { useContext } from "react";
import {AuthContext} from "../Context/authContext";


const Nav = () => {

    const { isLogin } = useContext(AuthContext);
    const { Logout } = useContext(AuthContext);

    return (





        <nav className="main-menu">
            <ul>
                <li>
                    <a href="http://justinfarrow.com">
                        <i className="fa fa-home fa-2x"></i>
                        <span className="nav-text">Dashboard </span>
                    </a>

                </li>

                <li>
                    <NavLink to='list'>
                        <i className="fa fa-table fa-2x"></i>
                        <span className="nav-text"> Tables </span>
                    </NavLink>

                </li>

                <li>
                    <NavLink to='category'>
                        <i className="fa fa-calendar-check-o fa-2x"></i>
                        <span className="nav-text"> Category </span>
                    </NavLink>

                </li>

            </ul>

            <ul className="logout">

                <li>
                    {
                        !isLogin &&
                        <NavLink to='login'>

                            <i className="fa fa-sign-in fa-2x" ></i>
                            <span className="nav-text"> Login </span>
                        </NavLink>
                    }

                    {
                        isLogin &&
                        <NavLink to='login' >

                            <i className="fa fa-sign-in fa-2x d-none"  ></i>
                            <span className="nav-text d-none"> Login </span>
                        </NavLink>
                    }




                </li>




               { isLogin &&  <li>
                
                        {/* <i className="fa fa-power-off fa-2x"></i> */}
                        <button className="btn btn-danger btn-d" onClick={Logout}  >Logout</button>
                        {/* <span className="nav-text"  onClick={Logout} > Logout </span> */}
                   
                </li>}

            </ul>
        </nav>



    );



};

export default Nav;