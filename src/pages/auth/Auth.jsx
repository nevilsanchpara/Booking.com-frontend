import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, signup, googleAuth } from "../../services/authService";
import { clearAuthResponseMsg } from "../../actions/authActions";
import { isEmail } from "../../global/Helpers";

const Auth = (props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [passErr, setPassErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const nav = useNavigate();
  const { loading, resError = {} } = props.auth;

  useEffect(() => {
    return () => {
      props.clearAuthResponseMsg();
    };
  }, []);

  const handleNextStep = () => {
    if (!email || !isEmail(email)) {
      setEmailErr("Enter valid email");
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/available`, {
          email,
        })
        .then((res) => {
          if (res.status == 200) {
            setStep(3);
          } else {
            setStep(2);
          }
        })
        .catch((e) => setStep(2));
    }
  };

  const handleLogin = async () => {
    const obj = { email, password };
    const result = await props.login(obj);
    if (result) {
      nav("/");
    }
  };

  const handleSignup = async () => {
    const obj = {
      email,
      password,
      type: "email",
      confirm_password: confirmPass,
    };
    const result = await props.signup(obj);
    if (result) {
      nav("/");
    }
  };

  return (
    <div>
      <Navbar />
      <form>
        {step === 1 && (
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mt-10">
                Sign in or create an account
              </h1>
              <div className="flex">
                <h1 className="text-sm font-medium self-start mt-5 text-md">
                  Email Address
                </h1>
              </div>
              <input
                type="text"
                required
                name="email"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
                className="px-20 py-1 border text-sm border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
              />
              <h1 className="text-red-600 mt-1 ">{resError.email}</h1>
              {emailErr && (
                <h3 className="text-red-500 mt-2 text-sm">{emailErr}</h3>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="mt-4 px-4 py-2 mb-3 bg-[#006CE4] text-white rounded hover:bg-[#003B95] focus:outline-none focus:ring-2 focus:ring-blue-400">
                Continue with email
              </button>
              <GoogleOAuthProvider clientId="636422965732-o7lpdfqjlvt92r888l4b0r12tomkseqg.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialRes) => {
                    console.log(credentialRes.credential);
                    const details = jwt_decode(credentialRes.credential);
                    const obj = {
                      name: details.name,
                      email: details.email,
                      googleId: credentialRes.clientId,
                      type: "google",
                      photo: details.picture,
                    };
                    const result = props.googleAuth(obj);
                    if (result) {
                      nav("/");
                    }
                  }}></GoogleLogin>
              </GoogleOAuthProvider>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mt-10">Create password</h1>
              <h1 className="text-sm font-medium mt-3">
                Use a minimum of 10 characters, including uppercase <br />{" "}
                letters, lowercase letters and numbers.
              </h1>
              <div className="flex">
                <h1 className="text-sm self-start font-semibold mt-5 text-md">
                  Password
                </h1>
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
                className="px-20 py-1 border text-sm border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
              />
              <h1 className="text-red-600 mt-1 ">{resError.password}</h1>
              <div className="flex">
                <h1 className="text-sm font-semibold self-start mt-5 text-md">
                  Confirm Password
                </h1>
              </div>

              <input
                type="text"
                name="setConfirmPass"
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm your password"
                className="px-20 py-1 border text-sm border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
              />
              <h1 className="text-red-600 mt-1 ">
                {resError.confirm_password}
              </h1>
              <button
                type="button"
                onClick={handleSignup}
                className="mt-4 px-4 py-2 bg-[#006CE4] text-white rounded hover:bg-[#003B95] focus:outline-none focus:ring-2 focus:ring-blue-400">
                Sign up
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mt-10">Enter your password</h1>
              <h1 className="text-sm font-medium mt-3">
                Use a minimum of 10 characters, including uppercase <br />{" "}
                letters, lowercase letters and numbers.
              </h1>
              <div className="flex">
                <h1 className="text-sm self-start font-semibold mt-5 text-md">
                  Password
                </h1>
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
                className="px-20 py-1 border text-sm border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
              />
              {resError.password && (
                <h1 className="text-sm text-red-500">{resError.password}</h1>
              )}
              {resError.error && (
                <h1 className="text-sm text-red-500">{resError.error}</h1>
              )}
              <button
                type="button"
                onClick={handleLogin}
                className="mt-4 px-4 py-2 bg-[#006CE4] text-white rounded hover:bg-[#003B95] focus:outline-none focus:ring-2 focus:ring-blue-400">
                Login
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  signup,
  googleAuth,
  login,
  clearAuthResponseMsg,
})(Auth);
