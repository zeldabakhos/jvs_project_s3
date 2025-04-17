import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import CreateProduct from "./pages/CreateProduct";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const App = () => {
  return (
  <>
  <Router>
    <NavBar />
    <main
      style={{ minHeight: "calc(100vh - 180px" }}
      className="container d-flex flex-column justify-content-center align-items-center vh-100 w-100"
    ></main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/createproduct" element={<CreateProduct/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    <Footer />
  </Router>
  </>
  )
}

export default App