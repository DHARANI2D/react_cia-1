import React, { Component } from 'react';
import { FormErrors } from './formerror';


class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {username:'',email: '', password: ''},
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) { 
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
        case 'username':
        usernameValid = value.length>3;
        fieldValidationErrors.username= usernameValid ? '' : ' is invalid';
        break; 
        case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
        case 'password':
            passwordValid = value.length > 6;
            fieldValidationErrors.password = passwordValid ? '': ' is weak';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="demoForm">
        <div className='out'>
            <div className='formin'>
        <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
          <label htmlFor="username">Enter your username</label><br></br>
          <input type="text" required className="form-control" name="username"
            placeholder="   your Username"
            value={this.state.username}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Enter your email</label><br></br>
          <input type="email" required className="form-control" name="email"
            placeholder="    your Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Enter your password</label><br></br>
          <input type="password" className="form-control" name="password"
            placeholder="   your Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <div className="panel">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
        </div>
        </div>
      </form>
    )
  }
}

export default Form;