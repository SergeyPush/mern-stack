import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";

const AuthPage = () => {
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data:" + data.message);
    } catch (error) {}
  };

  return (
    <div>
      <div className="row">
        <div className="col s6 offset-s3">
          <h1>Сократи ссылку</h1>

          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Authorisation</span>
              <div>
                <div className="input-field">
                  <input
                    placeholder="Enter email"
                    id="email"
                    type="email"
                    autoComplete="off"
                    name="email"
                    className="yellow-input"
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">First Name</label>
                </div>
                <div className="input-field">
                  <input
                    placeholder="Enter password"
                    id="password"
                    type="password"
                    autoComplete="off"
                    name="password"
                    className="yellow-input"
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">First Name</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: "10px" }}
                disabled={loading}
              >
                Enter
              </button>
              <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
