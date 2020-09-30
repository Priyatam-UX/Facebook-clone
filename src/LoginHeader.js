import React from 'react'
import { Link } from "react-router-dom";
import './LoginHeader.css';

function LoginHeader() {
    return (
        <div className="header">
            <Link className="link" to="/">
                <img className="header__logo" src="https://i.ibb.co/WzybLQK/del.png" alt="Facebook Logo" />
            </Link>
            <Link className="link" to="/register">
                <button className="header__button">Create New Account</button>
            </Link>
        </div>
    )
}

export default LoginHeader
