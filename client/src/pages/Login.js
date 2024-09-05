import React from 'react';
import "../styles/loginstyles.css";
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //Chilgojanand k samajh se bahar
//Chimkandi Shirish k samajh se upar ki chij. He bail budhhi kabhi kabhi
//Smart work karna chahiy 
  // Form Handler
  const onfinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', value);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        message.success('Logged in successfully');
        navigate('/');
      } else {
        message.error('Invalid credentials');
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='card p-4'>
          <h3>Login to BrandKiln Admin Panel</h3>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type='email' placeholder="Enter Your Email Address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input type='password' placeholder="Enter Your Password" />
          </Form.Item>
          <Button className='btn btn-primary' type='primary' htmlType='submit'>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
