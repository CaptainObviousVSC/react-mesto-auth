import React from 'react';
import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom'
function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Route path="/signup">
            <Link to="/signin" className="header__signin-link">Войти</Link>
</Route>
            <Route path="/signin">
            <Link to="/signup" className="header__signup-link">Зарегистрироваться</Link>
</Route>
        </header>
    );
}
export default Header;
