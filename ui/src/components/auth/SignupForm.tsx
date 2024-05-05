import { useSignupMutation } from "app/apiSlice";
import { ErrorType } from "app/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const onFinish = async () => {
    if (password === repeatPassword) {
      try {
        await signup({ username, email, password }).unwrap();
        setErrors([]);
        navigate("/");
      } catch (e) {
        const error = e as ErrorType;
        setErrors(error.data.errors);
      }
    } else {
      // @ts-expect-error ts(2322) FIXME: Type 'string' is not assignable to type 'never'.ts(2322
      setErrors(["Passwords do not match"]);
    }
  };

  return (
    <div>
      <h4>Sign Up</h4>
      {errors.length > 0 && (
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFinish();
        }}
      >
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Repeat Password:
          <input
            type='password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
