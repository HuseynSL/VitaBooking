import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext.jsx";
import styles from "./style.module.css";
import axios from "axios";
import url from "../../../utils/baseUrl.js";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Kayıt olma işlemi
      dispatch({ type: "REGISTER_START" });
      try {
        const res = await axios.post(`${url}/auth/register`, credentials);
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        navigate("/");
      } catch (err) {
        dispatch({
          type: "REGISTER_FAILURE",
          payload: err.response?.data?.error || "Registration failed",
        });
      }
    } else {
      // Giriş yapma işlemi
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(`${url}/auth/login`, credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      } catch (err) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err.response?.data?.error || "Login failed",
        });
      }
    }
  };

  return (
    <div className={styles.body}>
      <div
        className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ""}`}
        id="container"
      >
        {/* Register Form */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.h1}>Create Account</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}>
                <FaFacebookF />
              </a>
              <a href="#" className={styles.social}>
                <FaGooglePlusG />
              </a>
              <a href="#" className={styles.social}>
                <FaLinkedinIn />
              </a>
            </div>
            <span className={styles.span}>or use your email for registration</span>
            <input className={styles.input} type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input className={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input className={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button className={styles.button} disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
            {error && <span className={styles.error}>{error}</span>}
          </form>
        </div>

        {/* Login Form */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.h1}>Sign in</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}>
                <FaFacebookF />
              </a>
              <a href="#" className={styles.social}>
                <FaGooglePlusG />
              </a>
              <a href="#" className={styles.social}>
                <FaLinkedinIn />
              </a>
            </div>
            <span className={styles.span}>or use your account</span>
            <input className={styles.input} name="username" type="text" placeholder="Username" onChange={handleChange} required />
            <input className={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <a href="#">Forgot your password?</a>
            <button className={styles.button} disabled={loading}>{loading ? "Logging in..." : "Sign In"}</button>
            {error && <span className={styles.error}>{error}</span>}
          </form>
        </div>

        {/* Panel Animasyonu */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.h1}>Welcome Back!</h1>
              <p className={styles.p}>To keep connected with us please login with your personal info</p>
              <button className={styles.ghost} onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p className={styles.p}>Enter your personal details and start your journey with us</p>
              <button className={styles.ghost} onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
