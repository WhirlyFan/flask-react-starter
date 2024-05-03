import { useLoginMutation } from 'app/apiSlice';
import { ErrorType } from 'app/types';
import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
import styles from './auth.module.less';

const { Title } = Typography;

const LoginForm = () => {
  const [login] = useLoginMutation();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
  // const navigate = useNavigate();
  // const path = useLocation().pathname;

  const onFinish = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await login({ email, password }).unwrap();
      console.log(user);
      // path === '/login' ? navigate('/dashboard') : navigate(path);
    } catch (e) {
      const error = e as ErrorType;
      setErrors(error.data.errors);
    }
  };

  return (
    <div className={styles.layout}>
      <Title level={4}>Login</Title>
      <div>
        {errors?.map((error, ind) => (
          <Alert key={ind} type="error" message={error} />
        ))}
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email format!' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long' }
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        {/* <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="link" href="/forgot-password">
            Forgot password?
          </Button>
        </Form.Item> */}
        <Form.Item>
          <Button type="link" href="/signup" >
            Don't have an account? Sign up here!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
