import LoginForm from "components/auth/LoginForm";
import "./App.less";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "components/HomePage";
import SignupForm from "components/auth/SignupForm";
import Users from "components/Users";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
