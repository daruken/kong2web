import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const LoginForm = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/members/sign-in',
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );

      console.log('response : ' + response.data.token);

      if (response.data.isLogin === true) {
        alert('Success');
      } else {
        alert('Fail');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Auth-form-container">
      <Container className="panel">
        <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="Auth-form-content">
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Username"
                {...register('usernameRequired', {
                  required: true,
                })}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                {...register('passwordRequired', {
                  required: true,
                  minLength: 2,
                })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errors.username && errors.username.type === 'required' && (
              <p className="errorMsg">USERNAME is required.</p>
            )}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
