import React, {  useState } from 'react';
import pic from './assets/pic.png';

import {toast} from 'react-hot-toast'

const Validation_form = () => {
    const [isOpen, setIsOpen] = useState(false);
    const empty = {
      fname: '',
      lname: '',
      email: '',
      phone: '',
      password:""
    };
    const [inputs, setInputs] = useState(empty);
  
    const [error, setError] = useState({
      fname: '',
      email: '',
      password: '',
      phone: ''
    });
    
    const [validity, setValidity] = useState({
      fname: false,
      email: false,
      phone: false,
      password:false
    });
  
    const toggleLogin = () => {
      setIsOpen(!isOpen);
    };
  
    const Inputvalu = (event) => {
      const { name, value } = event.target;
      Validation(name, value);
  
      setInputs((prevInputs) => ({
        ...prevInputs,
      [name]:value
      }));
    };
  
    const Submitvalu = (e) => {
      e.preventDefault();
  
      // Check for errors before submitting
      if (Object.values(error).some((errorMsg) => errorMsg !== '') || Object.values(validity).some((isValid) => !isValid)) {
        // There are errors, do not submit the form
      toast.success('Form has errors. Please fix them before submitting.')

        return;
      }
  
      // If there are no errors, proceed with form submission
    //  
      let form = document.querySelector('form');
      form.reset();
      setInputs({
        fname: '',
        email: '',
        password: '',
        phone: ''
      });
      setValidity({
        fname: false,
        email: false,
        phone: false,
        password:false
      });
  
      toast.success('submitted successfully!')
       setTimeout(() => {
        
         window.location.reload();
       },1000);
    };
  
    const Validation = (name, value) => {
      let fnameRegex = /^[A-Za-z]+$/;
      switch (name) {
        case 'fname':
          setError((prevError) => ({
            ...prevError,
            fname: !fnameRegex.test(value) ? 'Only enter letters' : value.length < 3 ? 'First name should be at least 3 characters long' : ''
          }));
          setValidity((prevValidity) => ({
            ...prevValidity,
            fname: fnameRegex.test(value) && value.length >= 3
          }));
          break;
     
        case 'email':
          let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
          setError((prevError) => ({ ...prevError, email: !emailRegex.test(value) ? 'Invalid Email Id' : '' }));
          setValidity((prevValidity) => ({
            ...prevValidity,
            email: emailRegex.test(value)
          }));
          break;
        case 'phone':
          let phon = /^\d{10}$/;
          setError((prevError) => ({ ...prevError, phone: !phon.test(value) ? 'Phone number should be 10 digits' : '' }));
          setValidity((prevValidity) => ({
            ...prevValidity,
            phone: phon.test(value)
          }));
          break;
          case 'password':
              let pass =  /^[A-Za-z]\w{7,14}$/;
              setError((prevError) => ({ ...prevError, password: !pass.test(value) ? 'Enter valid password' : '' }));
              setValidity((prevValidity) => ({
                ...prevValidity,
                password:pass.test(value)
              }));
              break;
  
        default:
          break;
      }
    };
 
  
    return (
      <div className={`app ${isOpen ? 'open-login' : ''}`}>
        <div className="intro_viewer">
          <h2 className={`display  ${isOpen ? 'none hadding' : ''}`}>Welcome to Dreamer</h2>
          <h2 className={`none ${isOpen ? '' : 'none'}`}>Validation Form</h2>
          <p className={`none ${isOpen ? '' : 'none'}`}>
            Validation form using react
          </p>
          <div className={`img none ${isOpen ? '' : 'none'}`}>
            <img src={pic} alt="Logo" />
          </div>
        </div>
        <form className={isOpen ? 'open' : 'closed'} onSubmit={Submitvalu} >
          <h3>Register</h3>
          <input
            type="text"
            name="fname"
            placeholder="Full Name"
            required
            onChange={Inputvalu}
            value={inputs.fname}
            style={{ borderColor: error.fname ? 'red' : (inputs.fname && !error.fname ? 'green' : '#c25e5f') }}
          />
          <span style={{ color: 'red' }}>{error.fname}</span>
  
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={Inputvalu}
            value={inputs.email}
            autoComplete='off'
            style={{ borderColor: error.email ? 'red' : (inputs.email && !error.email ? 'green' : '#c25e5f') }}
          />
          <span style={{ color: 'red' }}>{error.email}</span>
  
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={Inputvalu}
            value={inputs.password}
            autoComplete='New-password'
            style={{ borderColor: error.password ? 'red' : (inputs.password && !error.password ? 'green' : '#c25e5f') }}
          />
          <span style={{ color: 'red' }}>{error.password}</span>
  
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={Inputvalu}
            value={inputs.phone}
            style={{ borderColor: error.phone ? 'red' : (inputs.phone && !error.phone ? 'green' : '#c25e5f') }}
          />
          <span style={{ color: 'red' }}>{error.phone}</span>
  
          <button className='singn' type="submit">Sign Up</button>
        </form>
        <div className="btn">
          <button className="toggle-btn" onClick={toggleLogin}>
      <img src="./arrow.png" alt="arrow" />
          </button>
        </div>
      </div>
    );
}

export default Validation_form
