import React from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom';
import '../styles/Login.css';
import auth from '../utils/auth'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    if (!this.state.username || !this.state.password){
      return;
    }
    auth.getLogin(this.state.username, this.state.password)
    .then((data) => {
      if (data){
        console.log(data)
        this.setState({email: '', password: ''} ,() => {
          console.log('hi')
        this.props.history.push('/');
        })
      }
    }).catch((err) => {console.log(err)})
  }
  render(){
    return(
      <div className="login">
        <p className="login__welcome">
            Вход
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <label className="login__label" htmlFor="username">
            Логин:
          </label>
          <input className="login__input" required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label className="login__label" htmlFor="password">
            Пароль:
          </label>
          <input className="login__input" required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
            <button type="submit" className="login__button">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
