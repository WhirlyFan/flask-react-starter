import { useLoginMutation } from "app/apiSlice";
import { ErrorType } from "app/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const user = await login({ email, password }).unwrap();
      console.log(user);
      setErrors([]);
      navigate("/")
    } catch (e) {
      const error = e as ErrorType;
      setErrors(error.data.errors);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <h1>Login</h1>
      <div>
        {errors?.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        name='email'
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <button type='submit'>Login</button>
      <button>Signup</button>
    </form>
  );
}
