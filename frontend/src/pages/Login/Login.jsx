import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import styles from "./style.module.css";
import axios from "axios"
import url from "../../utils/baseUrl.js"


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const {data, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${url}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Something went wrong" });
    }
  };


  return (
    <div className={styles.body}>
      <div
        className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ""}`}
        id="container"
      >
        
        {/* <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form>
            <h1>Create Account</h1>
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
            <span>or use your email for registration</span>
            <input className={styles.input} type="text" placeholder="Name" />
            <input className={styles.input} type="email" placeholder="Email" />
            <input className={styles.input} type="password" placeholder="Password" />
            <button className={styles.button}>Sign Up</button>
          </form>
        </div> */}

        
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form>
            <h1>Sign in</h1>
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
            <span>or use your account</span>
            <input onChange={handleChange} className={styles.input}  id="username"  type="text" placeholder="Name" />
            <input onChange={handleChange} className={styles.input} id="password" type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button  disabled={loading} onClick={handleClick} className={styles.button}>Sign In</button>
            {error && <span>{error.message}</span>}
          </form>
        </div>

        
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className={styles.ghost} onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
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
