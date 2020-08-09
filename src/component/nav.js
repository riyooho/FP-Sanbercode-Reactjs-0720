import React, {useContext} from "react";
import {
  Link,
  useHistory
} from "react-router-dom";
import LoginContext from '../login/logincontext.js'

const Nav = () => {
    const {status, setStatus} = useContext(LoginContext)
    const history = useHistory()

    const handleLogout = () => {
        setStatus(false)
        history.push("/")
    }

    return(
        <header>
            <img id="logo" src={require("../img/logo.png")} width="200px"/>
            <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/about">About</Link>
                    </li>

                    {status ?
                    <>
                        <li>
                        <Link to="/movies">Movie List Editor</Link>
                        </li>
                        <li>
                        <button className="log" onClick={handleLogout}>Logout</button>  
                        </li>
                    </>
                    :
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                    }

                    {/* <li>
                    <Link to="/movies">Movie List Editor</Link>
                    </li>
                    <li>
                    <Link to="/login">Login</Link>
                    </li> */}
                </ul>
            </nav>
        </header>
    )
}

export default Nav;