import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Axios from "axios";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  // const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // const getErrors = useSelector(state => state.errors);
  useEffect(() => {
    setState({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  }, []);

  if (isAuth) {
    props.history.push("/dashboard");
  }

  const handleChange = async (e) => {
    await setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };

    Axios.post("http://localhost:8080/api/users/register", newUser)
      .then((res) => {
        props.history.push("/login",);
      })
      .catch((err) => {
        // dispatch({
        //    type: "GET_ERRORS",
        //    payload: err.response.data,
        // });

        setErrors(err.response.data);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={state.name}
                name="name"
                id="name"
                placeholder="username"
              />
              <p className="input-error">{errors.name}</p>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                className="form-control"
                onChange={handleChange}
                value={state.email}
                name="email"
                id="email"
                type="email"
                placeholder="email here"
              />
              <p className="input-error">{errors.email || errors.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                className="form-control"
                onChange={handleChange}
                value={state.password}
                name="password"
                id="password"
                type="password"
                autocomplete="new-password"
                placeholder="password"
              />
              <p className="input-error">{errors.password}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <Input
                className="form-control"
                onChange={handleChange}
                name="password2"
                id="password2"
                value={state.password2}
                type="password"
                autocomplete="new-password"
                placeholder="confirm password"
              />
              <p className="input-error">{errors.passwords}</p>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
