import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useSignupMutation } from 'app/apiSlice';
import { ErrorType } from 'app/types';
import { Form, Input, Button, Typography, Alert } from 'antd';
import styles from './auth.module.less';

const { Title } = Typography;

const SignUpForm = () => {
  // const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const path = useLocation().pathname;

  const onFinish = async () => {
    if (password === repeatPassword) {
      try {
        await signup({ username, email, password }).unwrap();
        // path === '/signup' ? navigate('/dashboard') : navigate(path);
      } catch (e) {
        const error = e as ErrorType;
        setErrors(error.data.errors);
      }
    }
  };

  return (
    <div className={styles.layout}>
      <Title level={4}>Sign Up</Title>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 18 }}
      >
        <div>
          {errors?.map((error, ind) => (
            <Alert key={ind} type="error" message={error} />
          ))}
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email format!' }
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long' }
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeatPassword"
          rules={[
            { required: true, message: 'Please repeat your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              }
            })
          ]}
        >
          <Input.Password
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
