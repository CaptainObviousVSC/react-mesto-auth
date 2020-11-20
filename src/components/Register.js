import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import '../styles/Register.css';
import auth from '../utils/auth'
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    auth.getRegister(this.state.password, this.state.email).then((res) => {
            if(res.statusCode !== 400){
              this.props.history.push('/signin');
            }
          });
  }
  render(){
    return (
      <div className="register">
        <p className="register__welcome">
            Регистрация
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label className="register__label" htmlFor="email">
            Email:
          </label>
          <input className="register__input" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <label className="register__label" htmlFor="password">
            Пароль:
          </label>
          <input className="register__input" id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <div className="register__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="register__button">Зарегистрироваться</button>
          </div>
        </form>
        <div className="register__signin">
          <p className="register__signin-question">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__login-link">Войти</Link>
        </div>
        </div>
  );
  }

}
export default withRouter(Register)