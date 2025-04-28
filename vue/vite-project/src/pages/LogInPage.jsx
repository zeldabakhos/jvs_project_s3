import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LabelComp from '../components/LabelComp';
import InputForm from '../components/InputForm';
import AlertComp from '../components/AlertComp';
import { checkEmail } from '../utils/checkFormErrors';

const LogInPage = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (val) => setEmail(val);
  const handlePasswordChange = (val) => setPassword(val);
  localStorage.removeItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Remove the token before login attempt
    localStorage.removeItem("token");
  
    // Log to check if the token is removed
    console.log("Token after removal: ", localStorage.getItem("token")); // Should be null or undefined
    
    setIsLoggedIn(false);
  
    try {
      if (!checkEmail.checkEmpty(email)) throw Error("This is empty!");
      if (!checkEmail.checkFormat(email)) throw Error("Email bad !!!");
  
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 401) throw Error("Invalid credentials!");
  
      // The response body is now directly the token string
      const token = await response.text();
  
      // If you successfully receive the token, store it in localStorage
      localStorage.setItem("token", token); 
      setIsLoggedIn(true);
  
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };
  
  
  
  

  return (
    <div className="login-page-container">
      <form
        onSubmit={handleSubmit}
        className="card shadow-sm p-4 w-100"
        style={{ maxWidth: "480px", margin: "auto" }}
      >
        <h1 className="text-center">Log In</h1>
  
        <div className="mb-3">
          <LabelComp htmlFor="emailInput" displayText="Email" />
          <InputForm
            onChange={handleEmailChange}
            value={email}
            type="email"
            id="emailInput"
          />
        </div>
  
        <div className="mb-3">
          <LabelComp htmlFor="passwordInput" displayText="Password" />
          <InputForm
            onChange={handlePasswordChange}
            value={password}
            type="password"
            id="passwordInput"
          />
        </div>
  
        {error && <AlertComp alertType="alert-danger" text={error} />}
  
        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
  
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup" style={{ textDecoration: "underline", color: "#007bff" }}>
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
  
};

export default LogInPage;
