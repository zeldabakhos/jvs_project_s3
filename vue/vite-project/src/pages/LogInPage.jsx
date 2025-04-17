import React, { useState } from 'react';
import LabelComp from '../components/LabelComp';
import InputForm from '../components/InputForm';
import { checkEmail } from '../utils/checkFormErrors';
import AlertComp from '../components/AlertComp';

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (changedValue) => {
    setEmail(changedValue);
  };

  const handlePasswordChange = (changedPassword) => {
    setPassword(changedPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 

    try {
      if (!checkEmail.checkEmpty(email)) throw Error("This is empty!");
      if (!checkEmail.checkFormat(email)) throw Error("Email bad !!!");
    } catch (error) {
      console.error("Invalid email format");
      setError("Invalid email format: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-center">Log In</h1>

      <div className="mb-3">
        <LabelComp htmlFor="emailInput" displayText="Enter your email here!" />
        <InputForm
          onChange={handleEmailChange}
          value={email}
          type="email"
          id="emailInput"
          ariaDescribe="emailHelp"
        />
      </div>

      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>

      <div className="mb-3">
        <LabelComp htmlFor="passwordInput" displayText="Enter your password here!" />
        <InputForm
          onChange={handlePasswordChange}
          value={password}
          type="password"
          id="passwordInput"
          ariaDescribe="passwordHelp"
        />
      </div>

        {error && <AlertComp alertType="alert-danger" text = {error}/>}

    <button type="submit" className="btn btn-primary w-100">
        Log In
    </button>
    </form>
  );
};

export default LogInPage;
