import React from 'react'
import LabelComp from '../components/LabelComp'
import InputForm from '../components/InputForm'


const LogInPage = () => {
  return (
   <form
    className="card shadow-sm p-4 w-100"
    style={{ maxWidth: "480px", margin: "auto" }}
   >
    <h1 className="text-center">Log In</h1>
 
    <div className="mb-3">
     <LabelComp htmlFor="emailInput" displayText="Enter your email here!"/>
     <InputForm htmlFor="email" id="emailInput" ariaDescribe="emailHelp"/>
    </div>

    <div className="mb-3">
     <LabelComp htmlFor="passwordInput" displayText="Enter your password here!"/>
     <InputForm htmlFor="password" id="passwordInput" ariaDescribe="passwordHelp"/>
    </div>

     <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
     />
     <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
     </div>
   </form>
  )
 }
 
export default LogInPage
  

