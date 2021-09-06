import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoggedIn } from "../redux/actions/authActions";
import Axios from "axios";
import setAuthToken from "../redux/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Toastify from "toastify-js";

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // const isLoggedIn = useSelector((state) => state.auth.user.name);

  useEffect(() => {
    setState({
      email: "",
      password: "",
    });
    if (isAuth) {
      Toastify({
        text: "Logged in succesfully",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {},
      }).showToast();
      props.history.push("/home");
      dispatch(setLoggedIn(true));
    }
  }, [isAuth]);

  const handleChange = async (e) => {
    await setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };

    Axios.post("http://localhost:8080/api/users/login", userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(true);
        console.log(userData);
        const decoded = jwt_decode(token);
        dispatch(loginUser(decoded));
        dispatch(setLoggedIn(true));
        dispatch(setLoggedIn(true));
      })
      .catch((err) => {
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
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <Input
              className="form-control"
              onChange={handleChange}
              value={state.email}
              name="email"
              id="email"
              type="email"
              placeholder="Email"
            />
            <p className="input-error">
              {errors.email || errors.emailNotFound}
            </p>
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
              placeholder="Password"
            />
            <p className="input-error">
              {errors.password || errors.passwordIncorrect}
            </p>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              <span>Login</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
